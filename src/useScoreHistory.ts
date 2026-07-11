import { useCallback, useEffect, useState } from 'react'
import { onValue, ref, runTransaction, set } from 'firebase/database'
import { boardHistoryPath, boardScorePath, isValidBoardId } from './board'
import { db } from './firebase'
import { formatHistoryAction, formatHistoryTime, pushScoreHistory, type HistoryEntry } from './scoreHistory'
import type { Scores } from './useRemoteScores'

function parseHistory(raw: unknown): HistoryEntry[] {
  if (!raw || typeof raw !== 'object') return []

  return Object.entries(raw as Record<string, unknown>)
    .map(([id, value]) => {
      const entry = value as Partial<HistoryEntry>
      return {
        id,
        left: Math.max(0, Number(entry.left) || 0),
        right: Math.max(0, Number(entry.right) || 0),
        at: Number(entry.at) || 0,
        action: String(entry.action ?? 'update'),
      }
    })
    .sort((a, b) => b.at - a.at)
}

export function useScoreHistory(boardId: string | undefined) {
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isValidBoardId(boardId)) {
      setEntries([])
      setReady(true)
      return
    }

    return onValue(ref(db, boardHistoryPath(boardId)), (snapshot) => {
      setEntries(parseHistory(snapshot.val()))
      setReady(true)
    })
  }, [boardId])

  const restoreEntry = useCallback(
    async (entry: HistoryEntry) => {
      if (!isValidBoardId(boardId)) return

      const scores: Scores = { left: entry.left, right: entry.right }

      await set(ref(db, boardScorePath(boardId)), {
        ...scores,
        updatedAt: Date.now(),
      })

      await pushScoreHistory(boardId, scores, 'restore')
    },
    [boardId],
  )

  return { entries, ready, restoreEntry, formatHistoryTime, formatHistoryAction }
}

export function recordScoreMutation(
  boardId: string,
  updateFn: (current: Scores) => Scores,
  action: string,
) {
  return runTransaction(ref(db, boardScorePath(boardId)), (current) => {
    const data = (current ?? {}) as Partial<Scores>
    const parsed: Scores = {
      left: Math.max(0, Number(data.left) || 0),
      right: Math.max(0, Number(data.right) || 0),
    }
    const next = updateFn(parsed)
    return { ...next, updatedAt: Date.now() }
  }).then((result) => {
    if (!result.committed || !result.snapshot.exists()) return

    const scores = {
      left: Math.max(0, Number(result.snapshot.child('left').val()) || 0),
      right: Math.max(0, Number(result.snapshot.child('right').val()) || 0),
    }

    return pushScoreHistory(boardId, scores, action)
  })
}

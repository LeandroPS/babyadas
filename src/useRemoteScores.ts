import { useCallback, useEffect, useState } from 'react'
import { onValue, ref, runTransaction } from 'firebase/database'
import { boardScorePath, isValidBoardId } from './board'
import { db } from './firebase'

export type Scores = {
  left: number
  right: number
}

function parseScores(raw: unknown): Scores {
  const data = (raw ?? {}) as Partial<Scores>
  return {
    left: Math.max(0, Number(data.left) || 0),
    right: Math.max(0, Number(data.right) || 0),
  }
}

export function useRemoteScores(boardId: string | undefined) {
  const [scores, setScores] = useState<Scores>({ left: 0, right: 0 })
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isValidBoardId(boardId)) {
      setReady(true)
      setError('Placar inválido')
      return
    }

    setReady(false)
    setError(null)

    return onValue(
      ref(db, boardScorePath(boardId)),
      (snapshot) => {
        setScores(parseScores(snapshot.val()))
        setReady(true)
        setError(null)
      },
      (err) => {
        setError(err.message)
        setReady(true)
      },
    )
  }, [boardId])

  const mutate = useCallback(
    (updateFn: (current: Scores) => Scores) => {
      if (!isValidBoardId(boardId)) return

      runTransaction(ref(db, boardScorePath(boardId)), (current) => {
        const next = updateFn(parseScores(current))
        return { ...next, updatedAt: Date.now() }
      })
    },
    [boardId],
  )

  const adjustLeft = useCallback(
    (delta: number) => {
      mutate((current) => ({
        ...current,
        left: Math.max(0, current.left + delta),
      }))
    },
    [mutate],
  )

  const adjustRight = useCallback(
    (delta: number) => {
      mutate((current) => ({
        ...current,
        right: Math.max(0, current.right + delta),
      }))
    },
    [mutate],
  )

  const clearLeft = useCallback(() => {
    mutate((current) => ({ ...current, left: 0 }))
  }, [mutate])

  const clearRight = useCallback(() => {
    mutate((current) => ({ ...current, right: 0 }))
  }, [mutate])

  return {
    leftScore: scores.left,
    rightScore: scores.right,
    ready,
    error,
    adjustLeft,
    adjustRight,
    clearLeft,
    clearRight,
  }
}

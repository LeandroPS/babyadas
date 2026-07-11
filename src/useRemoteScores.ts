import { useCallback, useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { boardScorePath, isValidBoardId } from './board'
import { db } from './firebase'
import { recordScoreMutation } from './useScoreHistory'

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
    (updateFn: (current: Scores) => Scores, action: string) => {
      if (!isValidBoardId(boardId)) return
      recordScoreMutation(boardId, updateFn, action)
    },
    [boardId],
  )

  const adjustLeft = useCallback(
    (delta: number) => {
      const label = delta >= 0 ? `+${delta}` : `${delta}`
      mutate(
        (current) => ({
          ...current,
          left: Math.max(0, current.left + delta),
        }),
        `left ${label}`,
      )
    },
    [mutate],
  )

  const adjustRight = useCallback(
    (delta: number) => {
      const label = delta >= 0 ? `+${delta}` : `${delta}`
      mutate(
        (current) => ({
          ...current,
          right: Math.max(0, current.right + delta),
        }),
        `right ${label}`,
      )
    },
    [mutate],
  )

  const clearLeft = useCallback(() => {
    mutate((current) => ({ ...current, left: 0 }), 'clear-esquerdo')
  }, [mutate])

  const clearRight = useCallback(() => {
    mutate((current) => ({ ...current, right: 0 }), 'clear-direito')
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

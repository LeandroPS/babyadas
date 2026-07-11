import { useCallback, useEffect, useState } from 'react'
import { onValue, ref, runTransaction } from 'firebase/database'
import { db } from './firebase'

export type Scores = {
  left: number
  right: number
}

const SCORE_PATH = 'score'

function parseScores(raw: unknown): Scores {
  const data = (raw ?? {}) as Partial<Scores>
  return {
    left: Math.max(0, Number(data.left) || 0),
    right: Math.max(0, Number(data.right) || 0),
  }
}

function scoreRef() {
  return ref(db, SCORE_PATH)
}

export function useRemoteScores() {
  const [scores, setScores] = useState<Scores>({ left: 0, right: 0 })
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return onValue(
      scoreRef(),
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
  }, [])

  const mutate = useCallback((updateFn: (current: Scores) => Scores) => {
    runTransaction(scoreRef(), (current) => {
      const next = updateFn(parseScores(current))
      return { ...next, updatedAt: Date.now() }
    })
  }, [])

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

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'babyadas-scoreboard'

type Scores = {
  left: number
  right: number
}

function loadScores(): Scores {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { left: 0, right: 0 }

    const parsed = JSON.parse(raw) as Partial<Scores>
    return {
      left: Math.max(0, Number(parsed.left) || 0),
      right: Math.max(0, Number(parsed.right) || 0),
    }
  } catch {
    return { left: 0, right: 0 }
  }
}

function saveScores(scores: Scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}

export function usePersistedScores() {
  const [scores, setScores] = useState(loadScores)

  useEffect(() => {
    saveScores(scores)
  }, [scores])

  const adjustLeft = useCallback((delta: number) => {
    setScores((s) => ({ ...s, left: Math.max(0, s.left + delta) }))
  }, [])

  const adjustRight = useCallback((delta: number) => {
    setScores((s) => ({ ...s, right: Math.max(0, s.right + delta) }))
  }, [])

  const clearLeft = useCallback(() => {
    setScores((s) => ({ ...s, left: 0 }))
  }, [])

  const clearRight = useCallback(() => {
    setScores((s) => ({ ...s, right: 0 }))
  }, [])

  return {
    leftScore: scores.left,
    rightScore: scores.right,
    adjustLeft,
    adjustRight,
    clearLeft,
    clearRight,
  }
}

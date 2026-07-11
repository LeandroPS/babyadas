import { useCallback, useEffect, useState } from 'react'
import { get, onValue, ref, set } from 'firebase/database'
import { boardCelebratePath, isValidBoardId } from './board'
import { startContinuousConfetti, stopContinuousConfetti } from './celebrateConfetti'
import { db } from './firebase'

export function useRemoteConfetti(boardId: string | undefined) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!isValidBoardId(boardId)) return

    return onValue(ref(db, boardCelebratePath(boardId)), (snapshot) => {
      setActive(snapshot.val() === true)
    })
  }, [boardId])

  useEffect(() => {
    if (active) {
      startContinuousConfetti()
    } else {
      stopContinuousConfetti()
    }

    return () => stopContinuousConfetti()
  }, [active])

  const toggleConfetti = useCallback(async () => {
    if (!isValidBoardId(boardId)) return

    const celebrateRef = ref(db, boardCelebratePath(boardId))
    const snapshot = await get(celebrateRef)
    await set(celebrateRef, snapshot.val() !== true)
  }, [boardId])

  return { confettiActive: active, toggleConfetti }
}

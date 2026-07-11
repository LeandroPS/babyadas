import { useCallback, useEffect, useState } from 'react'
import { get, onValue, ref, set } from 'firebase/database'
import { startContinuousConfetti, stopContinuousConfetti } from './celebrateConfetti'
import { db } from './firebase'

const CELEBRATE_PATH = 'celebrate/active'

function celebrateRef() {
  return ref(db, CELEBRATE_PATH)
}

export function useRemoteConfetti() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    return onValue(celebrateRef(), (snapshot) => {
      setActive(snapshot.val() === true)
    })
  }, [])

  useEffect(() => {
    if (active) {
      startContinuousConfetti()
    } else {
      stopContinuousConfetti()
    }

    return () => stopContinuousConfetti()
  }, [active])

  const toggleConfetti = useCallback(async () => {
    const snapshot = await get(celebrateRef())
    await set(celebrateRef(), snapshot.val() !== true)
  }, [])

  return { confettiActive: active, toggleConfetti }
}

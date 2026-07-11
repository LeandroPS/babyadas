import { useEffect } from 'react'
import { stopContinuousConfetti, toggleContinuousConfetti } from './celebrateConfetti'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export function useWinnerConfetti() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== 'w') return
      if (isTypingTarget(event.target)) return

      event.preventDefault()
      toggleContinuousConfetti()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      stopContinuousConfetti()
    }
  }, [])
}

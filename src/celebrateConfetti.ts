import confetti from 'canvas-confetti'

const TEAM_COLORS = ['#2e7d4f', '#c0392b', '#f5ebe1', '#e8d48b', '#ffffff']

let animationId: number | null = null

function burst() {
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.2 },
    colors: TEAM_COLORS,
  })
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.2 },
    colors: TEAM_COLORS,
  })
  confetti({
    particleCount: 2,
    startVelocity: 0,
    ticks: 400,
    origin: { x: Math.random(), y: -0.05 },
    colors: TEAM_COLORS,
    gravity: 0.6,
    scalar: 1.1,
    drift: Math.random() * 0.4 - 0.2,
  })
}

export function isConfettiRunning() {
  return animationId !== null
}

export function startContinuousConfetti() {
  if (animationId !== null) return

  confetti({
    particleCount: 150,
    spread: 120,
    origin: { y: 0.45 },
    colors: TEAM_COLORS,
  })

  const frame = () => {
    burst()
    animationId = requestAnimationFrame(frame)
  }

  animationId = requestAnimationFrame(frame)
}

export function stopContinuousConfetti() {
  if (animationId === null) return
  cancelAnimationFrame(animationId)
  animationId = null
}

export function toggleContinuousConfetti() {
  if (animationId !== null) {
    stopContinuousConfetti()
  } else {
    startContinuousConfetti()
  }
}

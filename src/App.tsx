import { ScoreControls } from './components/ScoreControls'
import { usePersistedScores } from './usePersistedScores'
import { useWinnerConfetti } from './useWinnerConfetti'
import './App.css'

function formatScore(value: number): string {
  const clamped = Math.max(0, value)
  return clamped.toString().padStart(3, '0')
}

function App() {
  const { leftScore, rightScore, adjustLeft, adjustRight, clearLeft, clearRight } =
    usePersistedScores()

  useWinnerConfetti()

  return (
    <div className="app">
      <header className="scoreboard">
        <span className="score score--left">{formatScore(leftScore)}</span>
        <span className="scoreboard-divider" aria-hidden="true">
          :
        </span>
        <span className="score score--right">{formatScore(rightScore)}</span>
      </header>

      <main className="hero">
        <img
          src="/babyadas-logo.png"
          alt="Babyadas — competição do chá de bebê"
          className="hero-logo"
        />
      </main>

      <footer className="controls">
        <ScoreControls side="left" onAdjust={adjustLeft} onClear={clearLeft} />
        <ScoreControls side="right" onAdjust={adjustRight} onClear={clearRight} />
      </footer>
    </div>
  )
}

export default App

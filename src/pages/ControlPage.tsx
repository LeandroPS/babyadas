import { Link } from 'react-router-dom'
import { ScoreControls } from '../components/ScoreControls'
import { formatScore } from '../formatScore'
import { useRemoteConfetti } from '../useRemoteConfetti'
import { useRemoteScores } from '../useRemoteScores'
import '../App.css'
import './ControlPage.css'

export function ControlPage() {
  const {
    leftScore,
    rightScore,
    ready,
    error,
    adjustLeft,
    adjustRight,
    clearLeft,
    clearRight,
  } = useRemoteScores()

  const { confettiActive, toggleConfetti } = useRemoteConfetti()

  return (
    <div className="app app--control">
      <header className="control-header">
        <div>
          <p className="control-label">Controle remoto</p>
          {!ready && <p className="status-line">Conectando…</p>}
          {error && <p className="status-line status-line--error">{error}</p>}
        </div>
        <Link to="/" className="control-link">
          Ver placar
        </Link>
      </header>

      <div className="control-scoreboard">
        <span className="score score--left">{formatScore(leftScore)}</span>
        <span className="scoreboard-divider" aria-hidden="true">
          :
        </span>
        <span className="score score--right">{formatScore(rightScore)}</span>
      </div>

      <button
        type="button"
        className={`confetti-btn ${confettiActive ? 'confetti-btn--active' : ''}`}
        onClick={toggleConfetti}
      >
        {confettiActive ? 'Parar confetes' : 'Confetes! 🎉'}
      </button>

      <div className="control-panels">
        <ScoreControls variant="touch" side="left" onAdjust={adjustLeft} onClear={clearLeft} />
        <ScoreControls variant="touch" side="right" onAdjust={adjustRight} onClear={clearRight} />
      </div>
    </div>
  )
}

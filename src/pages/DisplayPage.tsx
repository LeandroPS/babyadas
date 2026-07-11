import { useParams } from 'react-router-dom'
import { ControlQrButton } from '../components/ControlQrButton'
import { formatScore } from '../formatScore'
import { isValidBoardId } from '../board'
import { useConfettiKeyboard } from '../useConfettiKeyboard'
import { useRemoteConfetti } from '../useRemoteConfetti'
import { useRemoteScores } from '../useRemoteScores'
import '../App.css'
import './DisplayPage.css'

export function DisplayPage() {
  const { id } = useParams()
  const { leftScore, rightScore, ready, error } = useRemoteScores(id)
  const { toggleConfetti } = useRemoteConfetti(id)

  useConfettiKeyboard(toggleConfetti)

  if (!isValidBoardId(id)) {
    return (
      <div className="app app--display">
        <p className="status-banner status-banner--error">Placar não encontrado</p>
      </div>
    )
  }

  return (
    <div className="app app--display">
      {!ready && <p className="status-banner">Conectando ao placar…</p>}
      {error && <p className="status-banner status-banner--error">{error}</p>}

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

      <ControlQrButton boardId={id} />
    </div>
  )
}

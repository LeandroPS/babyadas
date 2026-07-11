import { useParams } from 'react-router-dom'
import { ControlQrButton } from '../components/ControlQrButton'
import { Scoreboard } from '../components/Scoreboard'
import { isValidBoardId } from '../board'
import { useBoardTheme } from '../useBoardTheme'
import { useConfettiKeyboard } from '../useConfettiKeyboard'
import { useRemoteConfetti } from '../useRemoteConfetti'
import { useRemoteScores } from '../useRemoteScores'
import '../App.css'
import './DisplayPage.css'

export function DisplayPage() {
  const { id } = useParams()
  const { leftScore, rightScore, ready, error } = useRemoteScores(id)
  const { theme, style } = useBoardTheme(id)
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
    <div className="app app--display" style={style}>
      {!ready && <p className="status-banner">Conectando ao placar…</p>}
      {error && <p className="status-banner status-banner--error">{error}</p>}

      <Scoreboard leftScore={leftScore} rightScore={rightScore} theme={theme} />

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

import { Link, useParams } from 'react-router-dom'
import { ScoreHistoryButton } from '../components/ScoreHistoryButton'
import { Scoreboard } from '../components/Scoreboard'
import { ScoreControls } from '../components/ScoreControls'
import { ThemeSettings } from '../components/ThemeSettings'
import { displayPath, isValidBoardId } from '../board'
import { useBoardTheme } from '../useBoardTheme'
import { useRemoteConfetti } from '../useRemoteConfetti'
import { useRemoteScores } from '../useRemoteScores'
import '../App.css'
import './ControlPage.css'

export function ControlPage() {
  const { id } = useParams()
  const {
    leftScore,
    rightScore,
    ready,
    error,
    adjustLeft,
    adjustRight,
    clearLeft,
    clearRight,
  } = useRemoteScores(id)

  const { theme, style, updateTheme } = useBoardTheme(id)
  const { confettiActive, toggleConfetti } = useRemoteConfetti(id)

  if (!isValidBoardId(id)) {
    return (
      <div className="app app--control">
        <p className="status-line status-line--error">Placar não encontrado</p>
      </div>
    )
  }

  return (
    <div className="app app--control" style={style}>
      <header className="control-header">
        <div>
          <p className="control-label">Controle remoto</p>
          <p className="control-board-id">{id}</p>
          {!ready && <p className="status-line">Conectando…</p>}
          {error && <p className="status-line status-line--error">{error}</p>}
        </div>
        <Link to={displayPath(id)} className="control-link">
          Ver placar
        </Link>
      </header>

      <Scoreboard
        leftScore={leftScore}
        rightScore={rightScore}
        theme={theme}
        className="control-scoreboard"
      />

      <ThemeSettings theme={theme} onChange={updateTheme} />

      <button
        type="button"
        className={`confetti-btn ${confettiActive ? 'confetti-btn--active' : ''}`}
        onClick={toggleConfetti}
      >
        {confettiActive ? 'Parar confetes' : 'Confetes! 🎉'}
      </button>

      <div className="control-panels">
        <ScoreControls
          variant="touch"
          side="left"
          teamName={theme.leftTeamName}
          onAdjust={adjustLeft}
          onClear={clearLeft}
        />
        <ScoreControls
          variant="touch"
          side="right"
          teamName={theme.rightTeamName}
          onAdjust={adjustRight}
          onClear={clearRight}
        />
      </div>

      <ScoreHistoryButton boardId={id} variant="bar" />
    </div>
  )
}

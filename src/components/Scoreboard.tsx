import type { BoardTheme } from '../boardTheme'
import { formatScore } from '../formatScore'

type ScoreboardProps = {
  leftScore: number
  rightScore: number
  theme: BoardTheme
  className?: string
}

export function Scoreboard({ leftScore, rightScore, theme, className = '' }: ScoreboardProps) {
  return (
    <header className={`scoreboard ${className}`.trim()}>
      <div className="scoreboard-side scoreboard-side--left">
        <span className="score score--left">{formatScore(leftScore)}</span>
        {theme.showTeamNames && (
          <span className="scoreboard-team-name scoreboard-team-name--left">{theme.leftTeamName}</span>
        )}
      </div>
      <span className="scoreboard-divider" aria-hidden="true">
        :
      </span>
      <div className="scoreboard-side scoreboard-side--right">
        <span className="score score--right">{formatScore(rightScore)}</span>
        {theme.showTeamNames && (
          <span className="scoreboard-team-name scoreboard-team-name--right">{theme.rightTeamName}</span>
        )}
      </div>
    </header>
  )
}

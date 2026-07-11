import { useState } from 'react'
import { formatScore } from '../formatScore'
import { formatHistoryActionForTheme, useScoreHistory } from '../useScoreHistory'
import { formatHistoryTime } from '../scoreHistory'
import { useBoardTheme } from '../useBoardTheme'
import { HistoryIcon } from './Icons'
import './ControlQrButton.css'
import './ScoreHistoryButton.css'

type ScoreHistoryButtonProps = {
  boardId: string
  variant?: 'fab' | 'bar'
}

export function ScoreHistoryButton({ boardId, variant = 'fab' }: ScoreHistoryButtonProps) {
  const [open, setOpen] = useState(false)
  const { entries, ready, error, restoreEntry } = useScoreHistory(boardId, open)
  const { theme } = useBoardTheme(boardId)

  const buttonClass =
    variant === 'bar' ? 'history-bar-btn' : 'display-fab display-fab--history'

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        onClick={() => setOpen(true)}
        aria-label="Ver histórico do placar"
      >
        <HistoryIcon className={variant === 'bar' ? 'history-bar-btn__icon' : 'display-fab__icon'} />
        {variant === 'bar' && <span>Histórico</span>}
      </button>

      {open && (
        <div className="display-overlay" onClick={() => setOpen(false)} role="presentation">
          <div
            className="display-panel display-panel--history"
            role="dialog"
            aria-modal="true"
            aria-labelledby="history-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="history-title" className="display-panel__title">
              Histórico
            </h2>
            <p className="display-panel__hint">Toque em um estado anterior para restaurar</p>

            <div className="history-list">
              {!ready && <p className="history-empty">Carregando…</p>}
              {ready && error && <p className="history-empty history-empty--error">{error}</p>}
              {ready && !error && entries.length === 0 && (
                <p className="history-empty">Nenhuma alteração registrada ainda</p>
              )}
              {ready &&
                !error &&
                entries.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="history-item"
                    onClick={() => restoreEntry(entry)}
                  >
                    <span className="history-item__score">
                      <span className="history-item__left">{formatScore(entry.left)}</span>
                      <span className="history-item__sep">:</span>
                      <span className="history-item__right">{formatScore(entry.right)}</span>
                    </span>
                    <span className="history-item__meta">
                      <span>{formatHistoryActionForTheme(entry.action, theme)}</span>
                      <span>{formatHistoryTime(entry.at)}</span>
                    </span>
                  </button>
                ))}
            </div>

            <button type="button" className="display-panel__close" onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

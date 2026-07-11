import { useState } from 'react'
import { formatScore } from '../formatScore'
import { useScoreHistory } from '../useScoreHistory'
import { HistoryIcon } from './Icons'
import './ControlQrButton.css'

type ScoreHistoryButtonProps = {
  boardId: string
  className?: string
}

export function ScoreHistoryButton({ boardId, className = '' }: ScoreHistoryButtonProps) {
  const [open, setOpen] = useState(false)
  const { entries, ready, restoreEntry, formatHistoryTime, formatHistoryAction } =
    useScoreHistory(boardId)

  return (
    <>
      <button
        type="button"
        className={`display-fab display-fab--history ${className}`.trim()}
        onClick={() => setOpen(true)}
        aria-label="Ver histórico do placar"
        title="Histórico"
      >
        <HistoryIcon className="display-fab__icon" />
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
              {ready && entries.length === 0 && (
                <p className="history-empty">Nenhuma alteração registrada ainda</p>
              )}
              {entries.map((entry) => (
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
                    <span>{formatHistoryAction(entry.action)}</span>
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

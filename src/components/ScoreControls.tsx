import { useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'
import './ScoreControls.css'

type ScoreControlsProps = {
  side: 'left' | 'right'
  variant?: 'default' | 'touch'
  onAdjust: (delta: number) => void
  onClear: () => void
}

export function ScoreControls({
  side,
  variant = 'default',
  onAdjust,
  onClear,
}: ScoreControlsProps) {
  const [adding, setAdding] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const sign = adding ? 1 : -1
  const sideLabel = side === 'left' ? 'esquerdo' : 'direito'
  const teamLabel = side === 'left' ? 'Time verde' : 'Time vermelho'
  const isTouch = variant === 'touch'

  function handleAdjust(amount: number) {
    onAdjust(sign * amount)
  }

  function handleConfirmClear() {
    onClear()
    setConfirmOpen(false)
  }

  const toggleButton = (
    <button
      type="button"
      className={`ctrl-btn ctrl-btn--toggle ${adding ? 'ctrl-btn--add' : 'ctrl-btn--sub'}`}
      onClick={() => setAdding((v) => !v)}
      aria-pressed={adding}
      aria-label={adding ? 'Modo somar — toque para subtrair' : 'Modo subtrair — toque para somar'}
    >
      {adding ? '+' : '−'}
    </button>
  )

  const amountButtons = [1, 5, 10].map((amount) => (
    <button
      key={amount}
      type="button"
      className="ctrl-btn ctrl-btn--amount"
      onClick={() => handleAdjust(amount)}
    >
      {adding ? '+' : '−'}
      {amount}
    </button>
  ))

  return (
    <section
      className={`score-controls score-controls--${side} score-controls--${variant}`}
      aria-label={teamLabel}
    >
      {isTouch && <h2 className="score-controls__team">{teamLabel}</h2>}

      {isTouch ? (
        <div className="score-controls__row score-controls__row--mode">
          <span className="score-controls__hint">{adding ? 'Somando' : 'Subtraindo'}</span>
          {toggleButton}
        </div>
      ) : (
        toggleButton
      )}

      {isTouch ? (
        <div className="score-controls__amounts">{amountButtons}</div>
      ) : (
        amountButtons
      )}

      <button
        type="button"
        className="ctrl-btn ctrl-btn--clear"
        onClick={() => setConfirmOpen(true)}
      >
        limpar
      </button>

      <ConfirmDialog
        open={confirmOpen}
        title="Limpar placar"
        message={`Deseja zerar o placar ${sideLabel}?`}
        confirmLabel="Limpar"
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmOpen(false)}
      />
    </section>
  )
}

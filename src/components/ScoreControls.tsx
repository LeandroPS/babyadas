import { useState } from 'react'
import { ConfirmDialog } from './ConfirmDialog'
import './ScoreControls.css'

type ScoreControlsProps = {
  side: 'left' | 'right'
  onAdjust: (delta: number) => void
  onClear: () => void
}

export function ScoreControls({ side, onAdjust, onClear }: ScoreControlsProps) {
  const [adding, setAdding] = useState(true)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const sign = adding ? 1 : -1
  const sideLabel = side === 'left' ? 'esquerdo' : 'direito'

  function handleAdjust(amount: number) {
    onAdjust(sign * amount)
  }

  function handleConfirmClear() {
    onClear()
    setConfirmOpen(false)
  }

  return (
    <div className={`score-controls score-controls--${side}`}>
      <button
        type="button"
        className={`ctrl-btn ctrl-btn--toggle ${adding ? 'ctrl-btn--add' : 'ctrl-btn--sub'}`}
        onClick={() => setAdding((v) => !v)}
        aria-pressed={adding}
        title={adding ? 'Modo somar' : 'Modo subtrair'}
      >
        {adding ? '+' : '−'}
      </button>

      {[1, 5, 10].map((amount) => (
        <button
          key={amount}
          type="button"
          className="ctrl-btn ctrl-btn--amount"
          onClick={() => handleAdjust(amount)}
        >
          {adding ? '+' : '−'}
          {amount}
        </button>
      ))}

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
    </div>
  )
}

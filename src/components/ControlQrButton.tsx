import { useState } from 'react'
import QRCode from 'react-qr-code'
import { controlUrl } from '../board'
import './ControlQrButton.css'

type ControlQrButtonProps = {
  boardId: string
}

export function ControlQrButton({ boardId }: ControlQrButtonProps) {
  const [open, setOpen] = useState(false)
  const url = controlUrl(boardId)

  return (
    <>
      <button
        type="button"
        className="qr-fab"
        onClick={() => setOpen(true)}
        aria-label="Mostrar QR code do controle remoto"
        title="Controle remoto"
      >
        QR
      </button>

      {open && (
        <div className="qr-overlay" onClick={() => setOpen(false)} role="presentation">
          <div
            className="qr-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="qr-title" className="qr-title">
              Controle remoto
            </h2>
            <p className="qr-hint">Escaneie para abrir o controle no celular</p>
            <div className="qr-code-wrap">
              <QRCode value={url} size={200} bgColor="#f5ebe1" fgColor="#2c3e50" />
            </div>
            <p className="qr-url">{url}</p>
            <button type="button" className="qr-close" onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

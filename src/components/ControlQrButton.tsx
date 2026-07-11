import { useState } from 'react'
import QRCode from 'react-qr-code'
import { controlUrl } from '../board'
import { RemoteControlIcon } from './Icons'
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
        className="display-fab display-fab--remote"
        onClick={() => setOpen(true)}
        aria-label="Mostrar QR code do controle remoto"
        title="Controle remoto"
      >
        <RemoteControlIcon className="display-fab__icon" />
      </button>

      {open && (
        <div className="display-overlay" onClick={() => setOpen(false)} role="presentation">
          <div
            className="display-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remote-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="remote-title" className="display-panel__title">
              Controle remoto
            </h2>
            <p className="display-panel__hint">Escaneie para abrir o controle no celular</p>
            <div className="display-panel__qr">
              <QRCode value={url} size={200} bgColor="#f5ebe1" fgColor="#2c3e50" />
            </div>
            <p className="display-panel__url">{url}</p>
            <button type="button" className="display-panel__close" onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

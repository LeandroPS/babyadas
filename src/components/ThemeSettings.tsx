import { useEffect, useState } from 'react'
import type { BoardTheme } from '../boardTheme'
import './ControlQrButton.css'
import './ThemeSettings.css'

type ThemeSettingsProps = {
  theme: BoardTheme
  onChange: (partial: Partial<BoardTheme>) => void
}

type ThemeField = keyof BoardTheme

const FIELDS: {
  key: ThemeField
  label: string
  type: 'color' | 'text' | 'checkbox'
}[] = [
  { key: 'leftTeamName', label: 'Nome do time esquerdo', type: 'text' },
  { key: 'rightTeamName', label: 'Nome do time direito', type: 'text' },
  { key: 'showTeamNames', label: 'Mostrar nomes dos times no placar', type: 'checkbox' },
  { key: 'leftScoreColor', label: 'Cor do placar esquerdo', type: 'color' },
  { key: 'rightScoreColor', label: 'Cor do placar direito', type: 'color' },
  { key: 'backgroundColor', label: 'Cor de fundo', type: 'color' },
]

export function ThemeSettings({ theme, onChange }: ThemeSettingsProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(theme)

  useEffect(() => {
    if (open) setDraft(theme)
  }, [open, theme])

  function handleFieldChange(key: ThemeField, value: string | boolean) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function handleClose() {
    setOpen(false)
  }

  function handleSave() {
    onChange(draft)
    setOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="theme-settings__trigger"
        onClick={() => setOpen(true)}
      >
        Aparência do placar
      </button>

      {open && (
        <div className="display-overlay" onClick={handleClose} role="presentation">
          <div
            className="display-panel display-panel--theme"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="theme-title" className="display-panel__title">
              Aparência do placar
            </h2>
            <p className="display-panel__hint">Personalize cores e nomes dos times</p>

            <div className="theme-settings__fields">
              {FIELDS.map(({ key, label, type }) => (
                <label
                  key={key}
                  className={`theme-settings__field ${type === 'checkbox' ? 'theme-settings__field--checkbox' : ''}`}
                >
                  {type === 'checkbox' ? (
                    <>
                      <input
                        type="checkbox"
                        checked={draft.showTeamNames}
                        onChange={(event) => handleFieldChange('showTeamNames', event.target.checked)}
                      />
                      <span>{label}</span>
                    </>
                  ) : (
                    <>
                      <span>{label}</span>
                      {type === 'color' ? (
                        <input
                          type="color"
                          value={draft[key] as string}
                          onChange={(event) => handleFieldChange(key, event.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          value={draft[key] as string}
                          maxLength={32}
                          onChange={(event) => handleFieldChange(key, event.target.value)}
                        />
                      )}
                    </>
                  )}
                </label>
              ))}
            </div>

            <button type="button" className="display-panel__close" onClick={handleSave}>
              Salvar aparência
            </button>
            <button type="button" className="theme-settings__cancel" onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

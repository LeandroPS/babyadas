import { useEffect, useState } from 'react'
import type { BoardTheme } from '../boardTheme'
import './ThemeSettings.css'

type ThemeSettingsProps = {
  theme: BoardTheme
  onChange: (partial: Partial<BoardTheme>) => void
}

type ThemeField = keyof BoardTheme

const FIELDS: { key: ThemeField; label: string; type: 'color' | 'text' }[] = [
  { key: 'leftTeamName', label: 'Nome do time esquerdo', type: 'text' },
  { key: 'rightTeamName', label: 'Nome do time direito', type: 'text' },
  { key: 'leftScoreColor', label: 'Cor do placar esquerdo', type: 'color' },
  { key: 'rightScoreColor', label: 'Cor do placar direito', type: 'color' },
  { key: 'backgroundColor', label: 'Cor de fundo', type: 'color' },
]

export function ThemeSettings({ theme, onChange }: ThemeSettingsProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(theme)

  useEffect(() => {
    setDraft(theme)
  }, [theme])

  function handleFieldChange(key: ThemeField, value: string) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function handleSave() {
    onChange(draft)
    setOpen(false)
  }

  return (
    <section className="theme-settings">
      <button
        type="button"
        className="theme-settings__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        Aparência do placar
      </button>

      {open && (
        <div className="theme-settings__panel">
          {FIELDS.map(({ key, label, type }) => (
            <label key={key} className="theme-settings__field">
              <span>{label}</span>
              {type === 'color' ? (
                <input
                  type="color"
                  value={draft[key]}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={draft[key]}
                  maxLength={32}
                  onChange={(event) => handleFieldChange(key, event.target.value)}
                />
              )}
            </label>
          ))}

          <button type="button" className="theme-settings__save" onClick={handleSave}>
            Salvar aparência
          </button>
        </div>
      )}
    </section>
  )
}

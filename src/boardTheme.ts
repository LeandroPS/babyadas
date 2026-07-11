import type { CSSProperties } from 'react'

export type BoardTheme = {
  leftScoreColor: string
  rightScoreColor: string
  backgroundColor: string
  leftTeamName: string
  rightTeamName: string
  showTeamNames: boolean
}

export const DEFAULT_BOARD_THEME: BoardTheme = {
  leftScoreColor: '#2e7d4f',
  rightScoreColor: '#c0392b',
  backgroundColor: '#f5ebe1',
  leftTeamName: 'Time verde',
  rightTeamName: 'Time vermelho',
  showTeamNames: false,
}

const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/

export function sanitizeHexColor(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback
  const normalized = value.trim()
  return HEX_COLOR.test(normalized) ? normalized : fallback
}

export function sanitizeTeamName(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim().slice(0, 32)
  return trimmed || fallback
}

export function parseBoardTheme(raw: unknown): BoardTheme {
  const data = (raw ?? {}) as Partial<BoardTheme>
  return {
    leftScoreColor: sanitizeHexColor(data.leftScoreColor, DEFAULT_BOARD_THEME.leftScoreColor),
    rightScoreColor: sanitizeHexColor(data.rightScoreColor, DEFAULT_BOARD_THEME.rightScoreColor),
    backgroundColor: sanitizeHexColor(data.backgroundColor, DEFAULT_BOARD_THEME.backgroundColor),
    leftTeamName: sanitizeTeamName(data.leftTeamName, DEFAULT_BOARD_THEME.leftTeamName),
    rightTeamName: sanitizeTeamName(data.rightTeamName, DEFAULT_BOARD_THEME.rightTeamName),
    showTeamNames: data.showTeamNames === true,
  }
}

export function boardThemeStyle(theme: BoardTheme): CSSProperties {
  return {
    '--bg': theme.backgroundColor,
    '--team-left': theme.leftScoreColor,
    '--team-right': theme.rightScoreColor,
    background: theme.backgroundColor,
  } as CSSProperties
}

export function themeSideLabel(theme: BoardTheme, side: 'left' | 'right') {
  return side === 'left' ? theme.leftTeamName : theme.rightTeamName
}

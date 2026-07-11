import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { get, onValue, ref, set } from 'firebase/database'
import { boardThemePath, isValidBoardId } from './board'
import {
  boardThemeStyle,
  DEFAULT_BOARD_THEME,
  parseBoardTheme,
  type BoardTheme,
} from './boardTheme'
import { db } from './firebase'

export function useBoardTheme(boardId: string | undefined) {
  const [theme, setTheme] = useState<BoardTheme>(DEFAULT_BOARD_THEME)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isValidBoardId(boardId)) {
      setTheme(DEFAULT_BOARD_THEME)
      setReady(true)
      return
    }

    setReady(false)

    return onValue(
      ref(db, boardThemePath(boardId)),
      (snapshot) => {
        setTheme(parseBoardTheme(snapshot.val()))
        setReady(true)
        setError(null)
      },
      (err) => {
        setTheme(DEFAULT_BOARD_THEME)
        setReady(true)
        setError(err.message)
      },
    )
  }, [boardId])

  const updateTheme = useCallback(
    async (partial: Partial<BoardTheme>) => {
      if (!isValidBoardId(boardId)) return

      const snapshot = await get(ref(db, boardThemePath(boardId)))
      const current = parseBoardTheme(snapshot.val())
      const next = parseBoardTheme({ ...current, ...partial })

      await set(ref(db, boardThemePath(boardId)), {
        ...next,
        updatedAt: Date.now(),
      })
    },
    [boardId],
  )

  const style = boardThemeStyle(theme) as CSSProperties

  return { theme, ready, error, updateTheme, style }
}

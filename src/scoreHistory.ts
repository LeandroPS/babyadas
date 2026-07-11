import { push, ref } from 'firebase/database'
import { boardHistoryPath, isValidBoardId } from './board'
import { db } from './firebase'
import type { Scores } from './useRemoteScores'

export type HistoryEntry = Scores & {
  id: string
  at: number
  action: string
}

export async function pushScoreHistory(boardId: string, scores: Scores, action: string) {
  if (!isValidBoardId(boardId)) return

  await push(ref(db, boardHistoryPath(boardId)), {
    left: scores.left,
    right: scores.right,
    at: Date.now(),
    action,
  })
}

export function formatHistoryTime(at: number) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(at))
}

export function formatHistoryAction(action: string) {
  if (action === 'restore') return 'Restaurado'
  if (action.startsWith('clear-')) return `Limpar ${action.replace('clear-', '')}`
  if (action.startsWith('left ')) return `Verde ${action.replace('left ', '')}`
  if (action.startsWith('right ')) return `Vermelho ${action.replace('right ', '')}`
  return action
}

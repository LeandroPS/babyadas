const INVALID_ID = /[.#$[\]]/

export function isValidBoardId(id: string | undefined): id is string {
  if (!id) return false
  if (id.length < 1 || id.length > 64) return false
  return !INVALID_ID.test(id)
}

export function boardScorePath(id: string) {
  return `boards/${id}/score`
}

export function boardCelebratePath(id: string) {
  return `boards/${id}/celebrate/active`
}

export function boardHistoryPath(id: string) {
  return `boards/${id}/history`
}

export function boardThemePath(id: string) {
  return `boards/${id}/theme`
}

export function controlPath(id: string) {
  return `/${id}/control`
}

export function displayPath(id: string) {
  return `/${id}`
}

export function controlUrl(id: string) {
  return `${window.location.origin}${controlPath(id)}`
}

export function createBoardId() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 8)
}

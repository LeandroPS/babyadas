export function formatScore(value: number): string {
  return Math.max(0, value).toString().padStart(3, '0')
}

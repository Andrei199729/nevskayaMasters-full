export function getErrorMessage(
  error: unknown,
  fallback = 'Неизвестная ошибка',
): string {
  return error instanceof Error ? error.message : fallback;
}

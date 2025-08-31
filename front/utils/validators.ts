export function isValidArray<T>(data: any, label = 'Data'): data is T[] {
  const valid = Array.isArray(data);
  if (!valid) {
    console.error(`❌ Ошибка: ${label} не является массивом!`, data);
  }
  return valid;
}

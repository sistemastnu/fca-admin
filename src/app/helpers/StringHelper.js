export function cleanStringForURL(str) {
  return str
    .toLowerCase() // Convierte a minúsculas
    .normalize("NFD") // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
    .trim() // Elimina espacios al inicio y final
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/-+/g, "-"); // Reemplaza múltiples guiones por uno solo
}

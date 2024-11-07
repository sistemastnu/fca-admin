export function calculateReadingTime(words) {
  const wordsPerMinute = 183;
  const timeInMinutes = words / wordsPerMinute;
  return Math.ceil(timeInMinutes);
}

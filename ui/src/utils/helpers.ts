export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function formatDate(date: Date) {
  const now = new Date();
  const inputDate = new Date(date);

  const diffMs = now.getTime() - inputDate.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = inputDate.toDateString() === today.toDateString();
  const isYesterday = inputDate.toDateString() === yesterday.toDateString();

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  if (diffMinutes < 1) return 'только что';
  if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
  if (diffHours < 6)
    return `${diffHours} ${diffHours === 1 ? 'час' : 'часа'} назад`;
  if (isToday)
    return inputDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  if (isYesterday) return 'вчера';

  const day = inputDate.getDate();
  const month = monthNames[inputDate.getMonth()];

  return `${day} ${month}`;
}

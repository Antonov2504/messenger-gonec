export const isToday = (date: Date): boolean => {
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateToHoursMinutes = (date: Date): string => {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatLastMessageDate = (isoDate: string): string => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (isToday(date)) {
    return formatDateToHoursMinutes(date);
  }

  return formatDate(date);
};

export const formatMessageDateToMessageBlock = (isoDate: string): string => {
  if (!isoDate) {
    return '';
  }

  const date = new Date(isoDate);

  if (isToday(date)) {
    return 'Сегодня';
  }

  return formatDate(date);
};

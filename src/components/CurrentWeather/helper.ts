type DateFormat = 'day' | 'date' | 'month';

export const formatTimestamp = (timestamp: number, format: DateFormat): string => {
  const date = new Date(timestamp * 1000);
  let options: any = {};

  if (format === 'day') {
    options = { weekday: 'long' };
  } else if (format === 'date') {
    options = { day: 'numeric' };
  } else if (format === 'month') {
    options = { month: 'long' };
  }

  return date.toLocaleDateString('en-US', options);
};

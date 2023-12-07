export const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'
];

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getCurrentDate = (): Date => {
  return new Date();
};

export const getCurrentDay = (date: Date): number => {
  return date.getDate();
};

export const getCurrentMonth = (date: Date): number => {
  return date.getMonth();
};

export const getCurrentYear = (date: Date): number => {
  return date.getFullYear();
};

export const getMonthDays = (month: number, year: number): string[] => {
  const daysInMonth = getDaysInMonth(month, year);
  const currentDay = getCurrentDay(getCurrentDate());
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = currentDay + i;
    if (day > daysInMonth) {
      return day - daysInMonth;
    }
    return day;
  });
  return monthDays.map(day => String(day));
};

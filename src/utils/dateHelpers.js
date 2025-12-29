/**
 * CodeStreak Date Utilities
 * Core logic for handling YYYY-MM-DD conversions and comparisons.
 */

// Return date as "YYYY-MM-DD"
export const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

// Get today's date in YYYY-MM-DD
export const getToday = () => {
  return formatDate(new Date());
};

// Get yesterday's date in YYYY-MM-DD
export const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return formatDate(date);
};

// Check if a date string matches today
export const isToday = (dateString) => {
  return dateString === getToday();
};

// Calculate days remaining from today until target date
export const getDaysRemaining = (targetDate) => {
  if (!targetDate) return 0;
  
  // Normalize to midnight to avoid timezone issues affecting day count
  const today = new Date(getToday());
  const target = new Date(targetDate);
  
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
};

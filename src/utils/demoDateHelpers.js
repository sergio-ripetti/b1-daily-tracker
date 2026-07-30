import { formatDateKey } from "./dateHelpers.js";

export const getRollingDemoDateRange = (referenceDate = new Date()) => {
  const end = new Date(referenceDate);
  // Set to midnight to avoid timezone issues
  end.setHours(0, 0, 0, 0);

  // Calculate approximately one month back
  // Use safe day-of-month handling for month boundaries
  const start = new Date(end);
  start.setMonth(start.getMonth() - 1);

  return {
    start: formatDateKey(start),
    end: formatDateKey(end),
  };
};

export const getWorkdaysInRange = (startDate, endDate) => {
  const workdays = [];
  let current = new Date(startDate);
  const end = new Date(endDate);

  // Ensure end is inclusive
  end.setDate(end.getDate() + 1);

  while (current < end) {
    const dayOfWeek = current.getDay();
    // 1 = Monday, 5 = Friday
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workdays.push(formatDateKey(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return workdays;
};

// Deprecated: kept for backward compatibility but use getRollingDemoDateRange
export const getPreviousMonth = (referenceDate = new Date()) => {
  return getRollingDemoDateRange(referenceDate);
};

export const getWorkdaysInMonth = (startDate, endDate) => {
  return getWorkdaysInRange(startDate, endDate);
};

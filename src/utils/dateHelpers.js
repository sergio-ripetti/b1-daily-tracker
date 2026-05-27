const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Convert a Date object to YYYY-MM-DD using local time.
// Important: do not use toISOString here because timezone can shift the day.
export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Get today's date in YYYY-MM-DD format using local time
export const getToday = () => {
  return formatDateKey(new Date());
};

// Convert YYYY-MM-DD string to Date object using local time
export const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

// Display date like 19 May
export const displayDate = (dateString) => {
  return parseDate(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

// Display day like Mon, Tue, Wed
export const displayDay = (dateString) => {
  return DAYS[parseDate(dateString).getDay()];
};

// Check if the date is today
export const isToday = (dateString) => {
  return dateString === getToday();
};

// Get Monday of the week based on any selected date
export const getWeekStart = (dateString) => {
  const date = parseDate(dateString);
  const day = date.getDay();

  // Sunday is 0. If selected date is Sunday, go back 6 days.
  // Otherwise, go back to Monday.
  const diff = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + diff);

  return formatDateKey(date);
};

// Add days to a YYYY-MM-DD date string
export const addDays = (dateString, amount) => {
  const date = parseDate(dateString);

  date.setDate(date.getDate() + amount);

  return formatDateKey(date);
};

// Generate only Monday to Friday
export const getWorkWeekDays = (dateString) => {
  const monday = getWeekStart(dateString);

  return Array.from({ length: 5 }, (_, index) => {
    return addDays(monday, index);
  });
};

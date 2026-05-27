import { useState } from "react";
import {
  addDays,
  displayDate,
  getToday,
  getWeekStart,
  getWorkWeekDays,
} from "../utils/dateHelpers";

export function useWeekSelector() {
  // Stores the Monday date of the selected work week
  const [selectedWeek, setSelectedWeek] = useState(getWeekStart(getToday()));

  // Generates only Monday to Friday for the selected week
  const weekDays = getWorkWeekDays(selectedWeek);

  const currentWeek = getWeekStart(getToday());

  const isCurrentWeek = selectedWeek === currentWeek;

  const weekLabel = `${displayDate(weekDays[0])} - ${displayDate(
    weekDays[weekDays.length - 1],
  )}`;

  const goToPreviousWeek = () => {
    setSelectedWeek((currentWeek) => addDays(currentWeek, -7));
  };

  const goToNextWeek = () => {
    setSelectedWeek((currentWeek) => addDays(currentWeek, 7));
  };

  const goToCurrentWeek = () => {
    setSelectedWeek(currentWeek);
  };

  return {
    selectedWeek,
    weekDays,
    weekLabel,
    isCurrentWeek,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
  };
}

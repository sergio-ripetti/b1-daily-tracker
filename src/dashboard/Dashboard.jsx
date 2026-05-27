import { useMemo } from "react";
import DashboardStats from "./DashboardStats";
import DashboardTables from "./DashboardTables";
import WeekSelector from "../ui/WeekSelector";
import { useWeekSelector } from "../hooks/useWeekSelector";
import {
  getDashboardTotals,
  getDayStats,
  getItemStats,
  getLeastPopularItem,
  getMostPopularItem,
  getWeekRecords,
} from "../utils/dashboardHelpers";

export default function Dashboard({ items, records }) {
 
    const {
      weekDays,
      weekLabel,
      isCurrentWeek,
      goToPreviousWeek,
      goToNextWeek,
      goToCurrentWeek,
    } = useWeekSelector();
  // Records only for the selected Monday to Friday week
  const weekRecords = useMemo(() => {
    return getWeekRecords(records, weekDays);
  }, [records, weekDays]);

  const itemStats = useMemo(() => {
    return getItemStats(items, weekRecords);
  }, [items, weekRecords]);

  const dayStats = useMemo(() => {
    return getDayStats(weekDays, weekRecords);
  }, [weekDays, weekRecords]);

  const { totalRequested, totalReturned, totalSold, returnRate } =
    getDashboardTotals(itemStats);

  const mostPopularItem = getMostPopularItem(itemStats);

  const leastPopularItem = getLeastPopularItem(itemStats);
  return (
    <div>
      <div className="grid-wrapper" style={{ marginBottom: 24 }}>
        <WeekSelector
          weekLabel={weekLabel}
          isCurrentWeek={isCurrentWeek}
          onPreviousWeek={goToPreviousWeek}
          onNextWeek={goToNextWeek}
          onCurrentWeek={goToCurrentWeek}
        />
      </div>

      <DashboardStats
        totalRequested={totalRequested}
        totalSold={totalSold}
        totalReturned={totalReturned}
        returnRate={returnRate}
        mostPopularItem={mostPopularItem}
        leastPopularItem={leastPopularItem}
      />

      <DashboardTables itemStats={itemStats} dayStats={dayStats} />
    </div>
  );
}

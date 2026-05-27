import { useMemo } from "react";
import { toast } from "sonner";
import QuantityCell from "./QuantityCell";
import WeekSelector from "../ui/WeekSelector";
import { useWeekSelector } from "../hooks/useWeekSelector";
import { displayDate, displayDay, isToday } from "../utils/dateHelpers";

export default function DailyGrid({ items, records, setRecords }) {
  
const {
  weekDays,
  weekLabel,
  isCurrentWeek,
  goToPreviousWeek,
  goToNextWeek,
  goToCurrentWeek,
} = useWeekSelector();
  const recordMap = useMemo(() => {
    const map = {};

    records.forEach((record) => {
      map[`${record.itemId}|${record.date}`] = record;
    });

    return map;
  }, [records]);

  const handleSaveRecord = (itemId, date, data) => {
    setRecords((currentRecords) => {
      const existingRecord = currentRecords.find(
        (record) => record.itemId === itemId && record.date === date,
      );

      if (!data) {
        return currentRecords.filter(
          (record) => !(record.itemId === itemId && record.date === date),
        );
      }

      if (existingRecord) {
        return currentRecords.map((record) =>
          record.itemId === itemId && record.date === date
            ? { ...record, ...data }
            : record,
        );
      }

      const newRecord = {
        id: crypto.randomUUID(),
        itemId,
        date,
        requested: data.requested,
        returned: data.returned,
      };

      return [...currentRecords, newRecord];
    });
  };

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-title">No items yet</div>
        <div className="empty-state-sub">
          Add items in the Items page to start tracking.
        </div>
      </div>
    );
  }

  return (
    <div className="grid-wrapper">
      <WeekSelector
        weekLabel={weekLabel}
        isCurrentWeek={isCurrentWeek}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onCurrentWeek={goToCurrentWeek}
      />

      <div className="grid-scroll">
        <table className="grid-table">
          <thead>
            <tr>
              <th className="item-col">Item</th>

              {weekDays.map((date) => (
                <th key={date} className="date-col">
                  <div
                    className={`date-header-cell${
                      isToday(date) ? " date-header-today" : ""
                    }`}>
                    <div className="date-header-date">{displayDate(date)}</div>

                    <div className="date-header-day">
                      {displayDay(date)}
                      {isToday(date) ? " · Today" : ""}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="item-cell">{item.name}</td>

                {weekDays.map((date) => (
                  <QuantityCell
                    key={date}
                    record={recordMap[`${item.id}|${date}`]}
                    onSave={(data) => handleSaveRecord(item.id, date, data)}
                    onWarn={(message) => toast.warning(message)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

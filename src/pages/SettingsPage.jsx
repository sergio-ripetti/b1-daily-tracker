import { useState } from "react";
import { toast } from "sonner";
import ConfirmModal from "../ui/ConfirmModal";
import WeekSelector from "../ui/WeekSelector";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useWeekSelector } from "../hooks/useWeekSelector";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { displayDate } from "../utils/dateHelpers";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../ui/ThemeToggle";

export default function SettingsPage() {
  const [records, setRecords] = useLocalStorage(STORAGE_KEYS.records, []);
  const [showConfirm, setShowConfirm] = useState(false);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const {
    weekDays,
    weekLabel,
    isCurrentWeek,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
  } = useWeekSelector();

  const selectedWeekRecords = records.filter((record) =>
    weekDays.includes(record.date),
  );

  const selectedWeekRecordsCount = selectedWeekRecords.length;

  const handleClearSelectedWeek = () => {
    setRecords((currentRecords) =>
      currentRecords.filter((record) => !weekDays.includes(record.date)),
    );

    toast.success(`Records from ${weekLabel} were cleared`);
    setShowConfirm(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">
            Manage app preferences and local data
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Appearance</div>

        <p className="settings-description">
          Choose between dark mode and light mode. Your preference will be saved
          in this browser.
        </p>

        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

        <div className="settings-meta">
          Current theme: {theme}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Clear Weekly Records</div>

        <p className="settings-description">
          Select a work week and clear only the records from Monday to Friday.
          Your items will not be deleted.
        </p>

        <div className="grid-wrapper" style={{ marginBottom: 16 }}>
          <WeekSelector
            weekLabel={weekLabel}
            isCurrentWeek={isCurrentWeek}
            onPreviousWeek={goToPreviousWeek}
            onNextWeek={goToNextWeek}
            onCurrentWeek={goToCurrentWeek}
          />
        </div>

        <div className="settings-info-box">
          <div className="settings-info-label">
            Selected week: {weekLabel}
          </div>

          <div className="settings-info-text">
            Dates: {displayDate(weekDays[0])} to{" "}
            {displayDate(weekDays[weekDays.length - 1])}
          </div>

          <div className="settings-info-text">
            Records saved in this week: {selectedWeekRecordsCount}
          </div>
        </div>

        <button
          className="btn btn-danger"
          disabled={selectedWeekRecordsCount === 0}
          onClick={() => setShowConfirm(true)}
          style={{
            opacity: selectedWeekRecordsCount === 0 ? 0.5 : 1,
            cursor: selectedWeekRecordsCount === 0 ? "not-allowed" : "pointer",
          }}>
          Clear this week records
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          title={`Clear records from ${weekLabel}?`}
          message="This will remove only the requested, returned and sold records from this selected week. Your items will stay saved."
          confirmText="Clear week"
          cancelText="Cancel"
          onConfirm={handleClearSelectedWeek}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

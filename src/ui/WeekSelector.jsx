export default function WeekSelector({
  weekLabel,
  isCurrentWeek,
  onPreviousWeek,
  onNextWeek,
  onCurrentWeek,
}) {
  return (
    <div className="week-selector">
      <button
        className="week-nav-button"
        onClick={onPreviousWeek}
        aria-label="Previous week">
        ‹
      </button>

      <div className="week-selector-label">
        {isCurrentWeek ? `This Week: ${weekLabel}` : weekLabel}
      </div>

      <button
        className="week-nav-button"
        onClick={onNextWeek}
        aria-label="Next week">
        ›
      </button>

      {!isCurrentWeek && (
        <button className="btn btn-primary btn-sm" onClick={onCurrentWeek}>
          This Week
        </button>
      )}
    </div>
  );
}

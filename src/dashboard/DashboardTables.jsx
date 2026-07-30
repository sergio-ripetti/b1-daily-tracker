import {
  displayDate,
  displayDay,
  getToday,
  isToday,
} from "../utils/dateHelpers";

export default function DashboardTables({ itemStats, dayStats }) {
  const maxItemRequested = Math.max(
    ...itemStats.map((item) => item.requested),
    1,
  );

  const maxDayRequested = Math.max(...dayStats.map((day) => day.requested), 1);

  return (
    <div className="dash-grid">
      <div className="table-card">
        <div className="table-card-header">By Item</div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Requested</th>
              <th>Sold</th>
              <th>Returned</th>
            </tr>
          </thead>

          <tbody>
            {itemStats.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    color: "var(--text3)",
                    padding: 24,
                  }}>
                  No data for this week
                </td>
              </tr>
            ) : (
              itemStats.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>
                    <div className="bar-wrap">
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(item.requested / maxItemRequested) * 100}%`,
                            background: "var(--blue)",
                          }}
                        />
                      </div>

                      <span className="bar-val">{item.requested}</span>
                    </div>
                  </td>

                  <td>
                    <span className="pill pill-amber">{item.sold}</span>
                  </td>

                  <td>
                    <span className="pill pill-red">{item.returned}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <div className="table-card-header">By Day</div>

        <table className="dash-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Requested</th>
              <th>Sold</th>
              <th>Returned</th>
            </tr>
          </thead>

          <tbody>
            {dayStats.map((day) => (
              <tr
                key={day.date}
                style={
                  isToday(day.date) ? { background: "var(--amber-glow2)" } : {}
                }>
                <td>
                  <span style={{ fontWeight: 500 }}>
                    {displayDay(day.date)}
                  </span>

                  <span
                    style={{
                      color: "var(--text3)",
                      fontSize: 11,
                      marginLeft: 6,
                    }}>
                    {displayDate(day.date)}
                  </span>

                  {day.date === getToday() && (
                    <span className="pill pill-amber" style={{ marginLeft: 6 }}>
                      Today
                    </span>
                  )}
                </td>

                <td>
                  <div className="bar-wrap">
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(day.requested / maxDayRequested) * 100}%`,
                          background: "var(--amber)",
                        }}
                      />
                    </div>

                    <span className="bar-val">{day.requested}</span>
                  </div>
                </td>

                <td>
                  <span className="pill pill-green">{day.sold}</span>
                </td>

                <td>
                  <span
                    className={`pill${day.returned > 0 ? " pill-red" : ""}`}
                    style={day.returned === 0 ? { color: "var(--text3)" } : {}}>
                    {day.returned}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

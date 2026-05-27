export default function SummaryCard({ label, value, color = "", meta = "" }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>

      <div className={`stat-value ${color}`}>{value}</div>

      {meta && <div className="stat-meta">{meta}</div>}
    </div>
  );
}

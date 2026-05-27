import SummaryCard from "../ui/SummaryCard";

export default function DashboardStats({
  totalRequested,
  totalSold,
  totalReturned,
  returnRate,
  mostPopularItem,
  leastPopularItem,
}) {
  const sellThroughRate =
    totalRequested > 0 ? ((totalSold / totalRequested) * 100).toFixed(0) : 0;

  return (
    <div className="stats-row">
      <SummaryCard label="Total Requested" value={totalRequested} />

      <SummaryCard
        label="Total Sold"
        value={totalSold}
        color="amber"
        meta={`${sellThroughRate}% sell-through`}
      />

      <SummaryCard
        label="Total Returned"
        value={totalReturned}
        color="red"
        meta={`${returnRate}% return rate`}
      />

      <SummaryCard
        label="Most Popular"
        value={mostPopularItem ? mostPopularItem.name : "—"}
        color="green"
        meta={mostPopularItem ? `${mostPopularItem.sold} sold` : "No sales yet"}
      />

      <SummaryCard
        label="Least Popular"
        value={leastPopularItem ? leastPopularItem.name : "—"}
        color="red"
        meta={
          leastPopularItem ? `${leastPopularItem.sold} sold` : "No sales yet"
        }
      />
    </div>
  );
}

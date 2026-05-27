export const getWeekRecords = (records, weekDays) => {
  return records.filter((record) => weekDays.includes(record.date));
};

export const getItemStats = (items, weekRecords) => {
  return items.map((item) => {
    const itemRecords = weekRecords.filter(
      (record) => record.itemId === item.id,
    );

    const requested = itemRecords.reduce(
      (total, record) => total + record.requested,
      0,
    );

    const returned = itemRecords.reduce(
      (total, record) => total + record.returned,
      0,
    );

    const sold = requested - returned;

    return {
      id: item.id,
      name: item.name,
      requested,
      returned,
      sold,
    };
  });
};

export const getDayStats = (weekDays, weekRecords) => {
  return weekDays.map((date) => {
    const dayRecords = weekRecords.filter((record) => record.date === date);

    const requested = dayRecords.reduce(
      (total, record) => total + record.requested,
      0,
    );

    const returned = dayRecords.reduce(
      (total, record) => total + record.returned,
      0,
    );

    const sold = requested - returned;

    return {
      date,
      requested,
      returned,
      sold,
    };
  });
};

export const getDashboardTotals = (itemStats) => {
  const totalRequested = itemStats.reduce(
    (total, item) => total + item.requested,
    0,
  );

  const totalReturned = itemStats.reduce(
    (total, item) => total + item.returned,
    0,
  );

  const totalSold = totalRequested - totalReturned;

  const returnRate =
    totalRequested > 0
      ? ((totalReturned / totalRequested) * 100).toFixed(1)
      : "0.0";

  return {
    totalRequested,
    totalReturned,
    totalSold,
    returnRate,
  };
};

export const getMostPopularItem = (itemStats) => {
  return [...itemStats]
    .filter((item) => item.sold > 0)
    .sort((a, b) => b.sold - a.sold)[0];
};

export const getLeastPopularItem = (itemStats) => {
  return [...itemStats]
    .filter((item) => item.requested > 0)
    .sort((a, b) => a.sold - b.sold)[0];
};

import { STORAGE_KEYS } from "../constants/storageKeys";
import { getDemoItems, generateDemoRecords } from "../data/demoData";
import { formatDateKey } from "./dateHelpers";
import { getRollingDemoDateRange } from "./demoDateHelpers";

const CURRENT_DEMO_VERSION = 2;
const DEMO_ITEM_IDS = new Set(["item-1", "item-2", "item-3", "item-4", "item-5", "item-6", "item-7"]);

const isLikelyDemoData = (items, records) => {
  if (!items || !records || items.length === 0 || records.length === 0) {
    return false;
  }

  const allDemoItems = items.every((item) => DEMO_ITEM_IDS.has(item.id));
  if (!allDemoItems) {
    return false;
  }

  const allDemoRecordIds = records.every((record) =>
    record.id && record.id.startsWith("record-item-")
  );

  return allDemoRecordIds;
};

const needsMigration = (records) => {
  if (!records || records.length === 0) {
    return false;
  }

  const { start, end } = getRollingDemoDateRange();
  const outOfRangeRecords = records.filter((r) => r.date < start || r.date > end);

  return outOfRangeRecords.length > 0;
};

export const initializeDemoDataIfNeeded = () => {
  try {
    const existingItems = localStorage.getItem(STORAGE_KEYS.items);
    const existingRecords = localStorage.getItem(STORAGE_KEYS.records);
    const existingInitDate = localStorage.getItem(STORAGE_KEYS.demoInitializedAt);

    const todayDateKey = formatDateKey(new Date());

    // Case 1: Completely new browser (no data at all)
    if (!existingItems && !existingRecords && !existingInitDate) {
      const demoItems = getDemoItems();
      const demoRecords = generateDemoRecords(new Date());

      localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(demoItems));
      localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(demoRecords));
      localStorage.setItem(STORAGE_KEYS.demoInitializedAt, todayDateKey);
      localStorage.setItem(STORAGE_KEYS.demoVersion, String(CURRENT_DEMO_VERSION));

      return true;
    }

    // Case 2: Already initialized
    if (existingInitDate) {
      try {
        const items = JSON.parse(existingItems || "[]");
        const records = JSON.parse(existingRecords || "[]");

        // Check if migration is needed (untouched demo data with out-of-range dates)
        if (isLikelyDemoData(items, records) && needsMigration(records)) {
          const demoItems = getDemoItems();
          const demoRecords = generateDemoRecords(new Date());

          localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(demoItems));
          localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(demoRecords));
          localStorage.setItem(STORAGE_KEYS.demoVersion, String(CURRENT_DEMO_VERSION));

          return true;
        }
      } catch {
        // If migration check fails, don't force it
      }
      return false;
    }

    // Case 3: User has existing data (don't overwrite)
    if (existingItems && existingRecords) {
      // Mark as initialized so we don't keep trying
      localStorage.setItem(STORAGE_KEYS.demoInitializedAt, todayDateKey);
      localStorage.setItem(STORAGE_KEYS.demoVersion, String(CURRENT_DEMO_VERSION));
      return false;
    }

    return false;
  } catch {
    return false;
  }
};

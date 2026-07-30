#!/usr/bin/env node

import { getRollingDemoDateRange, getWorkdaysInRange } from "../src/utils/demoDateHelpers.js";
import { getDemoItems, generateDemoRecords } from "../src/data/demoData.js";

const validate = () => {
  console.log("\n=== B1 Ripe Deli Tracker - Demo Data Validation ===\n");

  const errors = [];
  const items = getDemoItems();
  const records = generateDemoRecords();
  const { start, end } = getRollingDemoDateRange();
  const workdays = getWorkdaysInRange(start, end);

  // Log basic info
  console.log(`✓ Rolling Demo Period: ${start} to ${end}`);
  console.log(`✓ Workdays in period: ${workdays.length}`);
  console.log(`✓ Demo products: ${items.length}`);
  console.log(`✓ Total records: ${records.length}`);
  console.log(`✓ Expected records: ${items.length} items × ${workdays.length} days = ${items.length * workdays.length}`);

  // Validate items
  const itemIds = new Set();
  items.forEach((item) => {
    if (!item.id || !item.name) {
      errors.push(`Item missing id or name: ${JSON.stringify(item)}`);
    }
    if (itemIds.has(item.id)) {
      errors.push(`Duplicate item ID: ${item.id}`);
    }
    itemIds.add(item.id);
  });

  console.log("\n--- Products ---");
  items.forEach((item) => {
    console.log(`  • ${item.name} (${item.id})`);
  });

  // Validate records
  const seenRecords = new Set();
  const recordsByItem = {};

  records.forEach((record) => {
    // Check required fields
    if (
      !record.id ||
      !record.itemId ||
      !record.date ||
      record.requested === undefined ||
      record.returned === undefined
    ) {
      errors.push(`Record missing fields: ${JSON.stringify(record)}`);
    }

    // Check duplicates
    const key = `${record.itemId}|${record.date}`;
    if (seenRecords.has(key)) {
      errors.push(`Duplicate record for item ${record.itemId} on ${record.date}`);
    }
    seenRecords.add(key);

    // Validate quantities
    if (record.requested < 0 || record.returned < 0) {
      errors.push(`Negative quantity in record: ${JSON.stringify(record)}`);
    }

    if (record.returned > record.requested) {
      errors.push(
        `Returned (${record.returned}) > Requested (${record.requested}): ${record.id}`
      );
    }

    // Check date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(record.date)) {
      errors.push(`Invalid date format: ${record.date}`);
    }

    // Check if date is a workday
    const dayOfWeek = new Date(record.date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      errors.push(`Record on weekend: ${record.date}`);
    }

    // Check date range
    if (record.date < start || record.date > end) {
      errors.push(`Record outside rolling demo period: ${record.date}`);
    }

    // Count by item
    if (!recordsByItem[record.itemId]) {
      recordsByItem[record.itemId] = 0;
    }
    recordsByItem[record.itemId] = recordsByItem[record.itemId] + 1;
  });

  // Test idempotency
  const records2 = generateDemoRecords();
  const isDeterministic = JSON.stringify(records) === JSON.stringify(records2);
  if (!isDeterministic) {
    errors.push("Demo data generation is not deterministic");
  } else {
    console.log("\n✓ Demo data generation is deterministic (idempotent)");
  }

  // Sample records
  console.log("\n--- Sample Records ---");
  const sampleRecords = records.slice(0, 5);
  sampleRecords.forEach((record) => {
    const item = items.find((i) => i.id === record.itemId);
    const sold = record.requested - record.returned;
    console.log(
      `  ${record.date} | ${item.name.padEnd(18)} | Req: ${String(record.requested).padStart(2)} | Ret: ${String(record.returned).padStart(2)} | Sold: ${String(sold).padStart(2)}`
    );
  });

  // Validation result
  console.log("\n--- Validation Result ---");
  if (errors.length === 0) {
    console.log("✓ All validations passed!");
    console.log(`✓ ${records.length} records across ${items.length} products`);
    console.log(`✓ ${workdays.length} working days in rolling period`);
    console.log("✓ No duplicate records");
    console.log("✓ All quantities valid (Returned ≤ Requested)");
    console.log("✓ All dates are workdays (Mon-Fri)");
    console.log("✓ Deterministic generation confirmed");
  } else {
    console.error(`✗ ${errors.length} error(s) found:`);
    errors.forEach((err) => console.error(`  - ${err}`));
  }

  console.log("\n");
  process.exit(errors.length > 0 ? 1 : 0);
};

validate();

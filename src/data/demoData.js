import { getRollingDemoDateRange, getWorkdaysInRange } from "../utils/demoDateHelpers.js";

const DEMO_PRODUCTS = [
  { id: "item-1", name: "Scone" },
  { id: "item-2", name: "Mini Scone" },
  { id: "item-3", name: "Brioche" },
  { id: "item-4", name: "Mini Brioche" },
  { id: "item-5", name: "Savoury Brioche" },
  { id: "item-6", name: "Key Lime" },
  { id: "item-7", name: "Cookies" },
];

// Deterministic pseudo-random generator with seed
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate demo quantity based on product, day, and month
const generateQuantity = (productIndex, dateString, rangeMin, rangeMax) => {
  // Parse date components
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a seed combining all factors
  const seed = productIndex * 1000 + year * 100 + month * 10 + day;
  const random = seededRandom(seed);

  return Math.floor(random * (rangeMax - rangeMin + 1) + rangeMin);
};

// Adjust quantities based on day of week (realistic variation)
const getDayMultiplier = (dateString) => {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  // Mon=1: 0.9x, Tue=2: 0.95x, Wed=3: 1.0x, Thu=4: 1.1x, Fri=5: 1.2x
  const multipliers = { 1: 0.9, 2: 0.95, 3: 1.0, 4: 1.1, 5: 1.2 };
  return multipliers[dayOfWeek] || 1.0;
};

// Product-specific ranges (realistic for each item)
const PRODUCT_RANGES = {
  "item-1": { delivered: [5, 12], returnRate: 0.15 }, // Scone
  "item-2": { delivered: [8, 18], returnRate: 0.15 }, // Mini Scone
  "item-3": { delivered: [4, 10], returnRate: 0.12 }, // Brioche
  "item-4": { delivered: [6, 14], returnRate: 0.12 }, // Mini Brioche
  "item-5": { delivered: [4, 9], returnRate: 0.1 }, // Savoury Brioche
  "item-6": { delivered: [3, 8], returnRate: 0.1 }, // Key Lime
  "item-7": { delivered: [8, 20], returnRate: 0.15 }, // Cookies
};

export const generateDemoRecords = (referenceDate = new Date()) => {
  const { start, end } = getRollingDemoDateRange(referenceDate);
  const workdays = getWorkdaysInRange(start, end);

  const records = [];

  DEMO_PRODUCTS.forEach((product, productIndex) => {
    const range = PRODUCT_RANGES[product.id];
    const [minDelivered, maxDelivered] = range.delivered;

    workdays.forEach((dateString) => {
      // Generate base delivered quantity
      const baseDelivered = generateQuantity(productIndex, dateString, minDelivered, maxDelivered);

      // Apply day multiplier (realistic variation Mon-Fri)
      const dayMultiplier = getDayMultiplier(dateString);
      const delivered = Math.round(baseDelivered * dayMultiplier);

      // Generate returned quantity based on product return rate
      const maxReturned = Math.round(delivered * range.returnRate);
      const seed = productIndex * 1000 + dateString.charCodeAt(0) * 100;
      const returned = Math.floor(seededRandom(seed + 0.5) * (maxReturned + 1));

      records.push({
        id: `record-${product.id}-${dateString}`,
        itemId: product.id,
        date: dateString,
        requested: delivered,
        returned: Math.min(returned, delivered), // Ensure returned <= delivered
      });
    });
  });

  return records;
};

export const getDemoItems = () => {
  return DEMO_PRODUCTS.map((item) => ({ ...item, archived: false }));
};

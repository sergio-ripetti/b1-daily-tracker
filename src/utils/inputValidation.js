// Validation helpers for quantity inputs and item names

export const QUANTITY_MAX_VALUE = 9999;
export const QUANTITY_MAX_LENGTH = 4;
export const ITEM_NAME_MAX_LENGTH = 40;

// Sanitize numeric input to allow only digits, up to max length
export const sanitizeQuantityInput = (value) => {
  if (value === "") return "";

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length > QUANTITY_MAX_LENGTH) {
    return digitsOnly.slice(0, QUANTITY_MAX_LENGTH);
  }

  return digitsOnly;
};

// Normalize quantity to integer on blur
export const normalizeQuantity = (value) => {
  if (value === "") return 0;

  const num = Number(value);

  if (isNaN(num) || num < 0) return 0;

  if (num > QUANTITY_MAX_VALUE) return QUANTITY_MAX_VALUE;

  return Math.floor(num);
};

// Validate that returned does not exceed requested
export const validateReturnedQuantity = (requested, returned) => {
  const req = Number(requested);
  const ret = Number(returned);

  return ret <= req;
};

// Sanitize item name: trim and limit length
export const sanitizeItemName = (value) => {
  if (value.length > ITEM_NAME_MAX_LENGTH) {
    return value.slice(0, ITEM_NAME_MAX_LENGTH);
  }

  return value;
};

// Validate item name
export const validateItemName = (name) => {
  const trimmed = name.trim();

  if (trimmed === "") {
    return {
      valid: false,
      message: "Item name cannot be empty.",
    };
  }

  if (trimmed.length > ITEM_NAME_MAX_LENGTH) {
    return {
      valid: false,
      message: `Item name must be 40 characters or fewer.`,
    };
  }

  return {
    valid: true,
    message: "",
  };
};

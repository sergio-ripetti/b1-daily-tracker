import { useState, useRef, useEffect } from "react";
import {
  sanitizeQuantityInput,
  normalizeQuantity,
  validateReturnedQuantity,
  QUANTITY_MAX_LENGTH,
} from "../utils/inputValidation";

export default function QuantityCell({ record, onSave, onWarn, disabled = false }) {
  const [requested, setRequested] = useState(record?.requested ?? "");
  const [returned, setReturned] = useState(record?.returned ?? "");
  const [returnedError, setReturnedError] = useState("");
  const groupRef = useRef(null);
  const returnedInputRef = useRef(null);

  const sold =
    requested !== "" && returned !== ""
      ? Math.max(0, Number(requested) - Number(returned))
      : null;

  const isWarning =
    requested !== "" && returned !== "" && Number(returned) > Number(requested);

  // Clear error when record changes (e.g., week navigation)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReturnedError("");
  }, [record?.id]);

  const handleNumberChange = (value, setter) => {
    const sanitized = sanitizeQuantityInput(value);
    setter(sanitized);

    // Clear error when Returned value becomes valid during editing
    if (setter === setReturned && returnedError) {
      const requestedNumber = normalizeQuantity(requested);
      const returnedNumber = normalizeQuantity(sanitized);
      if (validateReturnedQuantity(requestedNumber, returnedNumber)) {
        setReturnedError("");
      }
    }
  };

  // Finalize and persist cell values when group loses focus
  const finalizeCellValues = () => {
    // Handle case where both fields are empty
    if (requested === "" && returned === "") {
      setReturnedError("");
      onSave(null);
      return;
    }

    // Calculate normalized values
    const requestedNumber = normalizeQuantity(requested);
    const returnedNumber = normalizeQuantity(returned);

    // Validate that returned doesn't exceed requested
    if (!validateReturnedQuantity(requestedNumber, returnedNumber)) {
      const errorMsg = "Returned quantity cannot exceed requested quantity.";
      setReturnedError(errorMsg);
      onWarn(errorMsg);
      // Restore focus to the invalid Returned input
      returnedInputRef.current?.focus();
      return;
    }

    // Validation passed, clear any error
    setReturnedError("");

    // Update local display state with normalized string values
    setRequested(String(requestedNumber));
    setReturned(String(returnedNumber));

    // Persist the normalized values
    onSave({
      requested: requestedNumber,
      returned: returnedNumber,
    });
  };

  // Handle blur at the group level to detect when focus leaves the complete quantity-input group
  const handleGroupBlur = (event) => {
    if (disabled) return;

    // Check if focus is moving to another element within the same group
    const isFocusStillInGroup =
      groupRef.current &&
      event.relatedTarget &&
      groupRef.current.contains(event.relatedTarget);

    // Only finalize when focus completely leaves the group
    if (!isFocusStillInGroup) {
      finalizeCellValues();
    }
  };

  // Stable error ID for accessibility
  const returnedErrorId = `returned-error-${record?.id || "new"}`;

  return (
    <td className="qty-cell">
      <div
        className="qty-cell-inner"
        ref={groupRef}
        onBlur={handleGroupBlur}
      >
        <div className="qty-row">
          <span className="qty-label" style={{ color: "var(--blue)" }}>
            Req
          </span>

          <input
            className={`qty-input req${isWarning ? " warn" : ""}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={QUANTITY_MAX_LENGTH}
            value={requested}
            disabled={disabled}
            onChange={(event) =>
              handleNumberChange(event.target.value, setRequested)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.target.blur();
              }
            }}
          />
        </div>

        <div className="qty-row">
          <span className="qty-label" style={{ color: "var(--green)" }}>
            Ret
          </span>

          <input
            ref={returnedInputRef}
            className={`qty-input ret${isWarning ? " warn" : ""}${
              returnedError ? " error" : ""
            }`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={QUANTITY_MAX_LENGTH}
            value={returned}
            disabled={disabled}
            aria-invalid={Boolean(returnedError)}
            aria-describedby={returnedError ? returnedErrorId : undefined}
            onChange={(event) =>
              handleNumberChange(event.target.value, setReturned)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.target.blur();
              }
            }}
          />
        </div>

        {returnedError && (
          <div id={returnedErrorId} className="qty-error-msg">
            {returnedError}
          </div>
        )}

        {sold !== null && (
          <span className={`sold-badge${sold === 0 ? " zero" : ""}`}>
            {sold} sold
          </span>
        )}
      </div>
    </td>
  );
}

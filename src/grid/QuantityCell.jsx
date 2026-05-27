import { useEffect, useState } from "react";

export default function QuantityCell({ record, onSave, onWarn }) {
  const [requested, setRequested] = useState(record?.requested ?? "");
  const [returned, setReturned] = useState(record?.returned ?? "");

  // Keep the input updated when changing week or data
  useEffect(() => {
    setRequested(record?.requested ?? "");
  }, [record?.requested]);

  useEffect(() => {
    setReturned(record?.returned ?? "");
  }, [record?.returned]);

  const sold =
    requested !== "" && returned !== ""
      ? Math.max(0, Number(requested) - Number(returned))
      : null;

  const isWarning =
    requested !== "" && returned !== "" && Number(returned) > Number(requested);
const handleNumberChange = (value, setter) => {
  // Allow only numbers. Empty value is allowed so the user can clear the input.
  if (/^\d*$/.test(value)) {
    setter(value);
  }
};
  const saveCell = (newRequested, newReturned) => {
    if (newRequested === "" && newReturned === "") {
      onSave(null);
      return;
    }

    const requestedNumber = newRequested === "" ? 0 : Number(newRequested);
    const returnedNumber = newReturned === "" ? 0 : Number(newReturned);

    if (returnedNumber > requestedNumber) {
      onWarn("Returned quantity is higher than requested.");
    }

    onSave({
      requested: requestedNumber,
      returned: returnedNumber,
    });
  };

  return (
    <td className="qty-cell">
      <div className="qty-cell-inner">
        <div className="qty-row">
          <span className="qty-label" style={{ color: "#5b9df5" }}>
            Req
          </span>

          <input
            className={`qty-input req${isWarning ? " warn" : ""}`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={requested}
            onChange={(event) =>
              handleNumberChange(event.target.value, setRequested)
            }
            onBlur={() => saveCell(requested, returned)}
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
  className={`qty-input ret${isWarning ? " warn" : ""}`}
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={returned}
  onChange={(event) =>
    handleNumberChange(event.target.value, setReturned)
  }
  onBlur={() => saveCell(requested, returned)}
  onKeyDown={(event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }}
/>
        </div>

        {sold !== null && (
          <span className={`sold-badge${sold === 0 ? " zero" : ""}`}>
            {sold} sold
          </span>
        )}
      </div>
    </td>
  );
}

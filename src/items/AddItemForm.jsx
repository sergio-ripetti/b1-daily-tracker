import { ITEM_NAME_MAX_LENGTH, sanitizeItemName } from "../utils/inputValidation";

export default function AddItemForm({
  itemName,
  error,
  onItemNameChange,
  onAddItem,
}) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    const sanitized = sanitizeItemName(value);
    onItemNameChange(sanitized);
  };

  return (
    <div className="card">
      <div className="card-title">Add New Item</div>

      <div className="form-group">
        <input
          className={`input${error ? " error" : ""}`}
          type="text"
          placeholder="Example: Croissant"
          maxLength={ITEM_NAME_MAX_LENGTH}
          value={itemName}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onAddItem();
            }
          }}
        />

        <button className="btn btn-primary" onClick={onAddItem}>
          Add
        </button>
      </div>

      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}

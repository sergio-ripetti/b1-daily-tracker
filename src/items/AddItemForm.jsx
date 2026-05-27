export default function AddItemForm({
  itemName,
  error,
  onItemNameChange,
  onAddItem,
}) {
  return (
    <div className="card">
      <div className="card-title">Add New Item</div>

      <div className="form-group">
        <input
          className={`input${error ? " error" : ""}`}
          type="text"
          placeholder="Example: Croissant"
          value={itemName}
          onChange={(event) => onItemNameChange(event.target.value)}
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

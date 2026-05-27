import { useState } from "react";

export default function ItemRow({ item, onDeleteItem, onUpdateItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editError, setEditError] = useState("");

  const handleSave = () => {
    const result = onUpdateItem(item.id, editName);

    if (!result.success) {
      setEditError(result.message);
      return;
    }

    setEditError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditError("");
    setIsEditing(false);
  };

  return (
    <div className="item-row">
      {isEditing ? (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              className="item-edit-input"
              type="text"
              value={editName}
              autoFocus
              onChange={(event) => {
                setEditName(event.target.value);
                setEditError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSave();
                }

                if (event.key === "Escape") {
                  handleCancel();
                }
              }}
            />

            <div className="item-row-actions">
              <button className="btn btn-primary btn-sm" onClick={handleSave}>
                Save
              </button>

              <button className="btn btn-ghost btn-sm" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>

          {editError && <div className="error-msg">{editError}</div>}
        </div>
      ) : (
        <>
          <span className="item-row-name">{item.name}</span>

          <div className="item-row-actions">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDeleteItem(item.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

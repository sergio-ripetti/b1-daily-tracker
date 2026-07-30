import { useState } from "react";
import { ITEM_NAME_MAX_LENGTH, sanitizeItemName } from "../utils/inputValidation";

export default function ItemRow({ item, onArchiveItem, onDeleteItem, onUpdateItem }) {
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

  const handleEditInputChange = (event) => {
    const value = event.target.value;
    const sanitized = sanitizeItemName(value);
    setEditName(sanitized);
    setEditError("");
  };

  return (
    <div className="item-row">
      {isEditing ? (
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              className="item-edit-input"
              type="text"
              maxLength={ITEM_NAME_MAX_LENGTH}
              value={editName}
              autoFocus
              onChange={handleEditInputChange}
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
              className="btn btn-archive btn-sm"
              onClick={() => onArchiveItem(item.id)}
              title="Archive item"
              aria-label={`Archive ${item.name}`}>
              Archive
            </button>

            <button
              className="btn btn-item-delete btn-sm"
              onClick={() => onDeleteItem(item.id)}
              title="Permanently delete item"
              aria-label={`Permanently delete ${item.name}`}>
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
}

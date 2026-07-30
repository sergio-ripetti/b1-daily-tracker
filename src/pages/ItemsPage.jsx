import { useState, useMemo, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AddItemForm from "../items/AddItemForm";
import ItemsList from "../items/ItemsList";
import ConfirmModal from "../ui/ConfirmModal";
import { DEFAULT_ITEMS } from "../data/defaultItems";
import { STORAGE_KEYS } from "../constants/storageKeys";


export default function ItemsPage() {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.items, DEFAULT_ITEMS);
  const [records, setRecords] = useLocalStorage(STORAGE_KEYS.records, []);
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const [archiveTarget, setArchiveTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Migrate items to include archived property if missing (backward compatibility)
  const migrationRef = useRef(false);
  useEffect(() => {
    if (migrationRef.current) return;

    const needsMigration = items.some((item) => !("archived" in item));
    if (needsMigration) {
      migrationRef.current = true;
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          archived: item.archived ?? false,
        })),
      );
    } else {
      migrationRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemNameExists = (name, currentItemId = null) => {
    return items.some(
      (item) =>
        item.id !== currentItemId &&
        item.name.toLowerCase() === name.toLowerCase(),
    );
  };

  const getItemRecordCount = (itemId) => {
    return records.filter((record) => record.itemId === itemId).length;
  };

  const archivedItems = useMemo(() => {
    return items.filter((item) => item.archived === true);
  }, [items]);

  const activeItems = useMemo(() => {
    return items.filter((item) => item.archived !== true);
  }, [items]);

  const handleAddItem = () => {
    const cleanName = itemName.trim();

    if (!cleanName) {
      setError("Item name cannot be empty.");
      toast.error("Item name cannot be empty.");
      return;
    }

    if (itemNameExists(cleanName)) {
      setError("This item already exists.");
      toast.error("This item already exists.");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      name: cleanName,
      archived: false,
    };

    setItems((currentItems) => [...currentItems, newItem]);
    setItemName("");
    setError("");

    toast.success(`${cleanName} added successfully`);
  };

  const handleArchiveItem = (itemId) => {
    const itemToArchive = items.find((item) => item.id === itemId);
    if (!itemToArchive) return;
    setArchiveTarget(itemToArchive);
  };

  const confirmArchiveItem = () => {
    if (!archiveTarget) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === archiveTarget.id ? { ...item, archived: true } : item,
      ),
    );
    toast.success(
      `${archiveTarget.name} archived. Historical records preserved.`,
    );
    setArchiveTarget(null);
  };

  const handleDeleteItem = (itemId) => {
    const itemToDelete = items.find((item) => item.id === itemId);
    if (!itemToDelete) return;
    setDeleteTarget(itemToDelete);
  };

  const confirmDeleteItem = () => {
    if (!deleteTarget) return;

    // Remove the item
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== deleteTarget.id),
    );

    // Remove all linked records
    setRecords((currentRecords) =>
      currentRecords.filter((record) => record.itemId !== deleteTarget.id),
    );

    toast.success(`${deleteTarget.name} permanently deleted`);
    setDeleteTarget(null);
  };

  const handleRestoreItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, archived: false } : item,
      ),
    );
    const itemName = items.find((i) => i.id === itemId)?.name || "Item";
    toast.success(`${itemName} restored and available for data entry`);
  };

  const handleUpdateItem = (itemId, newName) => {
    const cleanName = newName.trim();

    if (!cleanName) {
      toast.error("Item name cannot be empty.");

      return {
        success: false,
        message: "Item name cannot be empty.",
      };
    }

    if (itemNameExists(cleanName, itemId)) {
      toast.error("This item already exists.");

      return {
        success: false,
        message: "This item already exists.",
      };
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, name: cleanName } : item,
      ),
    );

    toast.success(`${cleanName} updated successfully`);

    return {
      success: true,
      message: "",
    };
  };

  const getDeleteConfirmationMessage = (itemId) => {
    const recordCount = getItemRecordCount(itemId);
    if (recordCount > 0) {
      return `This item has ${recordCount} saved record${recordCount === 1 ? "" : "s"} across previous dates. Permanently deleting it will also remove all associated Requested, Returned, and Sold history. Dashboard totals and item statistics will be recalculated without this data. This action cannot be undone.`;
    }
    return "This item has no saved historical records. It will be permanently removed from the item list. This action cannot be undone.";
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Items</div>
          <div className="page-subtitle">Manage your bakery items</div>
        </div>
      </div>

      <div className="items-grid">
        <AddItemForm
          itemName={itemName}
          error={error}
          onItemNameChange={(value) => {
            setItemName(value);
            setError("");
          }}
          onAddItem={handleAddItem}
        />

        <div>
          <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
            Active Items ({activeItems.length})
          </h3>
          <ItemsList
            items={activeItems}
            onArchiveItem={handleArchiveItem}
            onDeleteItem={handleDeleteItem}
            onUpdateItem={handleUpdateItem}
          />
        </div>

        {archivedItems.length > 0 && (
          <div
            style={{
              marginTop: 24,
              padding: 16,
              backgroundColor: "var(--bg2)",
              borderRadius: 8,
              border: "1px solid var(--border)",
            }}>
            <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
              Archived Items ({archivedItems.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {archivedItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 12,
                    backgroundColor: "var(--bg1)",
                    borderRadius: 6,
                    fontSize: 14,
                    color: "var(--text2)",
                  }}>
                  <span>{item.name}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn btn-archive btn-sm"
                      onClick={() => handleRestoreItem(item.id)}
                      title="Restore item">
                      Restore
                    </button>
                    <button
                      className="btn btn-item-delete btn-sm"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Permanently delete item">
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {archiveTarget && (
        <ConfirmModal
          title={`Archive ${archiveTarget.name}?`}
          message="This item will no longer appear for future data entry. Its existing historical records and Dashboard statistics will be preserved. You can restore the item later."
          confirmText="Archive Item"
          confirmButtonClass="btn-archive"
          cancelText="Cancel"
          onConfirm={confirmArchiveItem}
          onCancel={() => setArchiveTarget(null)}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          title={`Permanently delete ${deleteTarget.name}?`}
          message={getDeleteConfirmationMessage(deleteTarget.id)}
          confirmText="Delete Permanently"
          cancelText="Cancel"
          onConfirm={confirmDeleteItem}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

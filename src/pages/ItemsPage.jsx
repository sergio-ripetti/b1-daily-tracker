import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "../hooks/useLocalStorage";
import AddItemForm from "../items/AddItemForm";
import ItemsList from "../items/ItemsList";
import ConfirmModal from "../ui/ConfirmModal";
import { DEFAULT_ITEMS } from "../data/defaultItems";
import { STORAGE_KEYS } from "../constants/storageKeys";


export default function ItemsPage() {
 const [items, setItems] = useLocalStorage(STORAGE_KEYS.items, DEFAULT_ITEMS);
  const [itemName, setItemName] = useState("");
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const itemNameExists = (name, currentItemId = null) => {
    return items.some(
      (item) =>
        item.id !== currentItemId &&
        item.name.toLowerCase() === name.toLowerCase(),
    );
  };

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
   };

   setItems((currentItems) => [...currentItems, newItem]);
   setItemName("");
   setError("");

   toast.success(`${cleanName} added successfully`);
 };

  const handleDeleteItem = (itemId) => {
    const itemToDelete = items.find((item) => item.id === itemId);

    if (!itemToDelete) return;

    setDeleteTarget(itemToDelete);
  };
  const confirmDeleteItem = () => {
    if (!deleteTarget) return;

    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== deleteTarget.id),
    );

    toast.success(`${deleteTarget.name} deleted successfully`);
    setDeleteTarget(null);
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

        <ItemsList
          items={items}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
        />
      </div>
      {deleteTarget && (
        <ConfirmModal
          title={`Delete ${deleteTarget.name}?`}
          message="This item will be removed from your list. This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteItem}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

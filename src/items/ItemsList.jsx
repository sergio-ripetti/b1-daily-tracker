import ItemRow from "./ItemRow";

export default function ItemsList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="card">
      <div className="card-title">All Items</div>

      {items.length === 0 ? (
        <div className="no-items">No items yet.</div>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onUpdateItem={onUpdateItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { useLocalStorage } from "../hooks/useLocalStorage";
import DailyGrid from "../grid/DailyGrid";
import { DEFAULT_ITEMS } from "../data/defaultItems";
import { STORAGE_KEYS } from "../constants/storageKeys";




export default function DailyGridPage() {
  const [items] = useLocalStorage(STORAGE_KEYS.items, DEFAULT_ITEMS);
  const [records, setRecords] = useLocalStorage(STORAGE_KEYS.records, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Daily Grid</div>
          <div className="page-subtitle">
            Monday to Friday production tracker
          </div>
        </div>
      </div>

      <DailyGrid items={items} records={records} setRecords={setRecords} />

      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: "var(--text3)",
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
        }}>
        <span>
          <span style={{ color: "#5b9df5" }}>Req</span> = Requested
        </span>

        <span>
          <span style={{ color: "var(--green)" }}>Ret</span> = Returned
        </span>

        <span>
          <span style={{ color: "var(--amber)" }}>Sold</span> = Req - Ret
        </span>
      </div>
    </div>
  );
}

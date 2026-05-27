import { useLocalStorage } from "../hooks/useLocalStorage";
import Dashboard from "../dashboard/Dashboard";
import { DEFAULT_ITEMS } from "../data/defaultItems";
import { STORAGE_KEYS } from "../constants/storageKeys";



export default function DashboardPage() {
const [items] = useLocalStorage(STORAGE_KEYS.items, DEFAULT_ITEMS);
const [records] = useLocalStorage(STORAGE_KEYS.records, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">
            Weekly summary from Monday to Friday
          </div>
        </div>
      </div>

      <Dashboard items={items} records={records} />
    </div>
  );
}

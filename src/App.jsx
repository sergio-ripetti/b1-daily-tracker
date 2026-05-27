import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/layout/Layout";
import DailyGridPage from "./pages/DailyGridPage";
import ItemsPage from "./pages/ItemsPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  useTheme();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/daily-grid" replace />} />
          <Route path="daily-grid" element={<DailyGridPage />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>

      <Toaster richColors position="bottom-right" />
    </>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeProvider";
import Layout from "./components/layout/Layout";
import DailyGridPage from "./pages/DailyGridPage";
import ItemsPage from "./pages/ItemsPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

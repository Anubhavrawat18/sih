import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { LoginPage } from "./components/pages/LoginPage";
import { Dashboard } from "./components/pages/Dashboard";
import { ReportsPage } from "./components/pages/ReportsPage";
import { HotspotAnalysisPage } from "./components/pages/HotspotAnalysisPage";
import { AlertsPage } from "./components/pages/AlertsPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { HelpPage } from "./components/pages/HelpPage";
import { ReportsProvider } from "./components/shared/ReportsContext";

// 🔒 PrivateRoute wrapper
function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ReportsProvider>
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

          {/* Protected App Layout */}
          <Route
            path="/*"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <div className="min-h-screen bg-gray-50">
                  {/* ✅ Static Navbar + Sidebar stay always */}
                  <Navbar onToggleSidebar={toggleSidebar} />
                  <div className="flex">
                    <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                    <main className="flex-1 lg:ml-64 transition-all duration-300">
                      <div className="min-h-[calc(100vh-4rem)]">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/reports" element={<ReportsPage />} />
                          <Route
                            path="/hotspots"
                            element={<HotspotAnalysisPage />}
                          />
                          <Route path="/alerts" element={<AlertsPage />} />
                          <Route
                            path="/analytics"
                            element={<AnalyticsPage />}
                          />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/help" element={<HelpPage />} />
                          <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                          />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ReportsProvider>
  );
}

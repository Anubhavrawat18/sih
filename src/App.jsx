import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import { Dashboard } from "./components/pages/Dashboard";
import { ReportsPage } from "./components/pages/ReportsPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { AlertsPage } from "./components/pages/AlertsPage";
import { LoginPage } from "./components/pages/LoginPage";
import { HotspotAnalysisPage } from "./components/pages/HotspotAnalysisPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { HelpPage } from "./components/pages/HelpPage";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { ReportsProvider } from "./components/shared/ReportsContext";

import { app, auth } from "./services/firebase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const handleToggleSidebar = () => setIsSidebarOpen((open) => !open);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <ReportsProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar onToggleSidebar={handleToggleSidebar} />
            <div className="flex">
              <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
              <main className="flex-1 lg:ml-64 transition-all duration-300">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="/hotspots" element={<HotspotAnalysisPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/help" element={<HelpPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        </ReportsProvider>
      )}
    </Router>
  );
}

export default App;

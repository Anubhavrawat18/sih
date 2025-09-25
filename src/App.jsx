import { useState } from "react";
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "reports":
        return <ReportsPage />;
      case "hotspots":
        return <HotspotAnalysisPage />;
      case "alerts":
        return <AlertsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "profile":
        return <ProfilePage />;
      case "help":
        return <HelpPage />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <ReportsProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onToggleSidebar={toggleSidebar} />
        
        <div className="flex">
          <Sidebar 
            activeView={activeView}
            onViewChange={handleViewChange}
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />
          
          <main className="flex-1 lg:ml-64 transition-all duration-300">
            <div className="min-h-[calc(100vh-4rem)]">
              {renderActiveView()}
            </div>
          </main>
        </div>
      </div>
    </ReportsProvider>
  );
}
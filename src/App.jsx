// src/App.jsx
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

import { ReportsPage } from "./components/pages/ReportsPage";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { AlertsPage } from "./components/pages/AlertsPage";
// import CommunityPage from "./components/pages/CommunityPage";
// import SettingsPage from "./components/pages/SettingsPage";
import { LoginPage } from "./components/pages/LoginPage";

const firebaseConfig = {
  apiKey: "AIzaSyBfAYhDoYLgQeiujQsp6zQTrdAOkmZ1bIY",
  authDomain: "sih25-472317-7ad51.firebaseapp.com",
  projectId: "sih25-472317-7ad51",
  storageBucket: "sih25-472317-7ad51.firebasestorage.app",
  messagingSenderId: "777523139075",
  appId: "1:777523139075:web:57432c5c27edc6a735b436",
  measurementId: "G-4FQXV9YF4L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        // Show login page until authenticated
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        // App layout after login
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />

          <div className="flex flex-col flex-1">
            {/* Navbar */}
            <Navbar />

            {/* Page content */}
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/reports" replace />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                {/* <Route path="/community" element={<CommunityPage />} /> */}
                {/* <Route path="/settings" element={<SettingsPage />} /> */}
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;

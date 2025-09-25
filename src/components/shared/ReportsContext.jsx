import { createContext, useContext, useState } from 'react';

const ReportsContext = createContext(undefined);

const initialReports = [
  {
    id: "RPT-001",
    dateTime: "2024-12-25 14:30",
    hazardType: "Tsunami Warning",
    location: "Santa Monica, CA",
    source: "Citizen Report",
    status: "Unverified",
    severity: "High",
    coordinates: "34.0522, -118.2437",
    lat: 34.0522,
    lng: -118.2437,
    description: "Large waves observed approaching shoreline. Multiple citizens reporting unusual wave patterns and rapid water recession.",
    reporterInfo: "Local resident, beachfront property"
  },
  {
    id: "RPT-002", 
    dateTime: "2024-12-25 12:15",
    hazardType: "Coastal Flooding",
    location: "Miami Beach, FL",
    source: "Social Media",
    status: "Unverified",
    severity: "Medium",
    coordinates: "25.7617, -80.1918",
    lat: 25.7617,
    lng: -80.1918,
    description: "Street flooding reported on Ocean Drive. Water levels approximately 1-2 feet above normal high tide levels.",
    reporterInfo: "Tourist social media post"
  },
  {
    id: "RPT-003",
    dateTime: "2024-12-25 10:45",
    hazardType: "Storm Surge",
    location: "Virginia Beach, VA",
    source: "Official",
    status: "Unverified",
    severity: "High",
    coordinates: "36.8529, -75.9780",
    lat: 36.8529,
    lng: -75.9780,
    description: "Storm surge heights reaching 4-6 feet above normal. Significant coastal inundation affecting beachfront properties.",
    reporterInfo: "National Weather Service"
  },
  {
    id: "RPT-004",
    dateTime: "2024-12-24 18:20",
    hazardType: "High Winds",
    location: "San Francisco, CA",
    source: "Citizen Report",
    status: "Unverified",
    severity: "Low",
    coordinates: "37.7749, -122.4194",
    lat: 37.7749,
    lng: -122.4194,
    description: "Sustained winds of 45+ mph reported along coastal areas. Minor property damage to outdoor structures.",
    reporterInfo: "Harbor patrol officer"
  },
  {
    id: "RPT-005",
    dateTime: "2024-12-24 16:10",
    hazardType: "Coastal Flooding",
    location: "Atlantic City, NJ",
    source: "Social Media",
    status: "Unverified",
    severity: "Medium",
    coordinates: "39.3643, -74.4229",
    lat: 39.3643,
    lng: -74.4229,
    description: "Parking lots along boardwalk experiencing flooding. Water depth estimated at 6-12 inches.",
    reporterInfo: "Multiple social media reports"
  }
];

export function ReportsProvider({ children }) {
  const [reports, setReports] = useState(initialReports);

  const verifyReport = (id) => {
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, status: 'Verified' } : report
    ));
  };

  const flagReport = (id) => {
    setReports(prev => prev.map(report => 
      report.id === id ? { ...report, status: 'Flagged' } : report
    ));
  };

  const getVerifiedReports = () => {
    return reports.filter(report => report.status === 'Verified');
  };

  const getUnverifiedReports = () => {
    return reports.filter(report => report.status === 'Unverified');
  };

  return (
    <ReportsContext.Provider value={{
      reports,
      verifyReport,
      flagReport,
      getVerifiedReports,
      getUnverifiedReports
    }}>
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}
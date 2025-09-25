import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  AlertTriangle,
  TrendingUp,
  MapPin,
  Clock,
  Filter,
  ZoomIn,
  Users,
  MessageSquare,
} from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  GoogleMap,
  Circle,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

// Import your Google Maps API key from .env file
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export function Dashboard() {
  const [validatedReports, setValidatedReports] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 20, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Get user's browser location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("Error getting location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    // Fetch validated reports from Firestore
    const fetchValidatedReports = async () => {
      try {
        const reportsRef = collection(db, "reports");
        const q = query(reportsRef, where("validated", "==", true));
        const querySnapshot = await getDocs(q);
        const reports = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setValidatedReports(reports);
      } catch (error) {
        console.error("Error fetching validated reports:", error);
      }
    };
    fetchValidatedReports();
  }, []);

  // Use location.lat/lng for valid reports
  const validReports = validatedReports
    .filter(
      (report) =>
        report.location &&
        typeof report.location.lat === "number" &&
        typeof report.location.lng === "number" &&
        !isNaN(report.location.lat) &&
        !isNaN(report.location.lng)
    )
    .map((report) => ({
      ...report,
      // Don't duplicate lat/lng at top-level
    }));

  const stats = [
    {
      label: "Validated Reports Today",
      value: validReports.length.toString(),
      change: "+3",
      color: "text-green-600",
    },
    {
      label: "Active Hotspots",
      value: "4",
      change: "-1",
      color: "text-red-600",
    },
    {
      label: "Social Media Mentions",
      value: "247",
      change: "+15%",
      color: "text-blue-600",
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "Tsunami Warning",
      location: "Pacific Coast",
      time: "2h ago",
      severity: "High",
    },
    {
      id: 2,
      type: "Storm Surge",
      location: "Gulf Coast",
      time: "4h ago",
      severity: "Medium",
    },
    {
      id: 3,
      type: "High Winds",
      location: "Atlantic Coast",
      time: "6h ago",
      severity: "Low",
    },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  const getCircleOptions = (severity) => {
    switch (severity) {
      case "High":
        return {
          strokeColor: "#ef4444",
          fillColor: "#ef4444",
          fillOpacity: 0.35,
          strokeOpacity: 0.7,
          strokeWeight: 2,
          radius: 10000,
        };
      case "Medium":
        return {
          strokeColor: "#f59e0b",
          fillColor: "#f59e0b",
          fillOpacity: 0.25,
          strokeOpacity: 0.5,
          strokeWeight: 2,
          radius: 7000,
        };
      case "Low":
        return {
          strokeColor: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.18,
          strokeOpacity: 0.4,
          strokeWeight: 2,
          radius: 4000,
        };
      default:
        return {
          strokeColor: "#6b7280",
          fillColor: "#6b7280",
          fillOpacity: 0.15,
          strokeOpacity: 0.3,
          strokeWeight: 1,
          radius: 2500,
        };
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">
            Ocean Guard Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time coastal hazard monitoring and intelligence
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[#1D7BC1] border-[#1D7BC1]">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-[#1D7BC1] hover:bg-[#103173]">
            <ZoomIn className="h-4 w-4 mr-2" />
            Focus Map
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-[#103173]">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${stat.color}`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <div className="p-2 bg-[#A0E2F8] rounded-lg">
                  {index === 0 && (
                    <AlertTriangle className="h-6 w-6 text-[#1D7BC1]" />
                  )}
                  {index === 1 && (
                    <TrendingUp className="h-6 w-6 text-[#1D7BC1]" />
                  )}
                  {index === 2 && (
                    <MessageSquare className="h-6 w-6 text-[#1D7BC1]" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Google Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Hazard Map</CardTitle>
              <CardDescription>
                Validated reports with interactive hotspots (click to view
                details)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: "400px", width: "100%" }}>
                {isLoaded && (
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={userLocation}
                    zoom={7}
                    onLoad={() => setMapLoaded(true)}
                  >
                    {/* User's browser location marker (optional circle for user) */}
                    <Circle
                      center={userLocation}
                      options={{
                        strokeColor: "#16a34a",
                        fillColor: "#22c55e",
                        fillOpacity: 0.18,
                        strokeOpacity: 0.7,
                        strokeWeight: 2,
                        radius: 2000,
                        clickable: false,
                        zIndex: 1,
                      }}
                    />

                    {/* Hotspots as Circles */}
                    {validReports.map((report) => (
                      <Circle
                        key={report.id}
                        center={{
                          lat: report.location.lat,
                          lng: report.location.lng,
                        }}
                        options={{
                          ...getCircleOptions(report.severity),
                          clickable: true,
                          zIndex: 2,
                        }}
                        onClick={() => setSelectedPin(report)}
                      />
                    ))}

                    {/* Info window for selected report */}
                    {selectedPin && (
                      <InfoWindow
                        position={{
                          lat: selectedPin.location.lat,
                          lng: selectedPin.location.lng,
                        }}
                        onCloseClick={() => setSelectedPin(null)}
                      >
                        <div>
                          <strong>{selectedPin.eventType}</strong>
                          <br />
                          Severity: {selectedPin.severity}
                          <br />
                          {selectedPin.desc}
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest hazard notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#103173]">{alert.type}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View All Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

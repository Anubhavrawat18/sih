import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useReports } from "../shared/ReportsContext";
import { 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Filter,
  ZoomIn,
  Users,
  MessageSquare
} from "lucide-react";

export function Dashboard() {
  const { getVerifiedReports } = useReports();
  const [selectedPin, setSelectedPin] = useState(null);
  
  const verifiedReports = getVerifiedReports();

  const stats = [
    { label: "Verified Reports Today", value: verifiedReports.length.toString(), change: "+3", color: "text-green-600" },
    { label: "Active Hotspots", value: "4", change: "-1", color: "text-red-600" },
    { label: "Social Media Mentions", value: "247", change: "+15%", color: "text-blue-600" },
  ];

  const recentAlerts = [
    { id: 1, type: "Tsunami Warning", location: "Pacific Coast", time: "2h ago", severity: "High" },
    { id: 2, type: "Storm Surge", location: "Gulf Coast", time: "4h ago", severity: "Medium" },
    { id: 3, type: "High Winds", location: "Atlantic Coast", time: "6h ago", severity: "Low" },
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getReportColor = (report) => {
    switch (report.severity) {
      case "High": return "#ef4444";
      case "Medium": return "#f59e0b"; 
      case "Low": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  const handlePinClick = (report) => {
    setSelectedPin(report);
  };

  const handlePinHover = (report) => {
    setSelectedPin(report);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">Ocean Guard Dashboard</h1>
          <p className="text-gray-600">Real-time coastal hazard monitoring and intelligence</p>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-[#103173]">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change} from yesterday</p>
                </div>
                <div className="p-2 bg-[#A0E2F8] rounded-lg">
                  {index === 0 && <AlertTriangle className="h-6 w-6 text-[#1D7BC1]" />}
                  {index === 1 && <TrendingUp className="h-6 w-6 text-[#1D7BC1]" />}
                  {index === 2 && <MessageSquare className="h-6 w-6 text-[#1D7BC1]" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Hazard Map</CardTitle>
              <CardDescription>Verified reports with interactive pins (hover to view details)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-[#A0E2F8] to-[#B9D4E9] rounded-lg h-96 overflow-hidden">
                {/* Simplified map background */}
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1D7BC1" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Coastline representation */}
                    <path d="M50,350 Q200,300 400,320 T750,340" stroke="#103173" strokeWidth="2" fill="none"/>
                    <path d="M30,200 Q150,180 300,190 T600,200" stroke="#103173" strokeWidth="2" fill="none"/>
                  </svg>
                </div>

                {/* Verified Report Pins */}
                {verifiedReports.map((report) => {
                  const x = ((report.lng + 180) / 360) * 800;
                  const y = ((90 - report.lat) / 180) * 400;
                  
                  return (
                    <div
                      key={report.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                      style={{ left: `${x}px`, top: `${y}px` }}
                      onClick={() => handlePinClick(report)}
                      onMouseEnter={() => handlePinHover(report)}
                      onMouseLeave={() => setSelectedPin(null)}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: getReportColor(report) }}
                      />
                      {/* Ripple effect for high severity */}
                      {report.severity === "High" && (
                        <div 
                          className="absolute inset-0 rounded-full border-2 animate-ping"
                          style={{ borderColor: getReportColor(report) }}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Hover Card */}
                {selectedPin && (
                  <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#103173]">{selectedPin.hazardType}</h4>
                      <Badge 
                        className={getSeverityColor(selectedPin.severity)}
                      >
                        {selectedPin.severity}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedPin.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{selectedPin.dateTime}</span>
                      </div>
                      <p className="text-xs mt-2">{selectedPin.coordinates}</p>
                    </div>
                  </div>
                )}

                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow border">
                  <h5 className="font-medium text-xs mb-2 text-[#103173]">Verified Reports</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>High Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Medium Severity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Low Severity</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {verifiedReports.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No verified reports available for map display</p>
                  <p className="text-sm">Verify reports in the Reports page to see them here</p>
                </div>
              )}
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
                <div key={alert.id} className="p-3 border rounded-lg hover:bg-gray-50">
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
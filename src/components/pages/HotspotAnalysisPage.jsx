import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { useReports } from "../shared/ReportsContext";
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  FileDown, 
  Clock,
  BarChart3,
  Activity
} from "lucide-react";

export function HotspotAnalysisPage() {
  const { getVerifiedReports } = useReports();
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [timeRange, setTimeRange] = useState([12]);
  const [selectedPeriod, setSelectedPeriod] = useState("Dec 2024");

  const verifiedReports = getVerifiedReports();

  // Group verified reports by region to create hotspots
  const createHotspotsFromVerifiedReports = () => {
    const regionGroups = {};
    
    verifiedReports.forEach(report => {
      const region = report.location.split(',')[1]?.trim() || report.location;
      if (!regionGroups[region]) {
        regionGroups[region] = [];
      }
      regionGroups[region].push(report);
    });

    // Only show regions with multiple verified reports (2 or more)
    const hotspots = Object.entries(regionGroups)
      .filter(([_, reports]) => reports.length >= 2)
      .map(([region, reports], index) => {
        const highSeverityCount = reports.filter(r => r.severity === 'High').length;
        const riskLevel = highSeverityCount >= 2 ? 'High' : 
                         highSeverityCount >= 1 ? 'Medium' : 'Low';
        
        const mostRecentReport = reports.sort((a, b) => 
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        )[0];

        return {
          id: index + 1,
          region: reports[0].location,
          riskLevel,
          reportCount: reports.length,
          lastReport: mostRecentReport.dateTime,
          trend: riskLevel === 'High' ? 'increasing' : 'stable',
          coordinates: `${mostRecentReport.lat.toFixed(4)}, ${mostRecentReport.lng.toFixed(4)}`,
          description: `${reports.length} verified ${reports.length === 1 ? 'incident' : 'incidents'} in this region`,
          riskFactors: [
            "Multiple verified incidents",
            "Geographic vulnerability", 
            reports.some(r => r.severity === 'High') ? "High severity events" : "Moderate severity events"
          ],
          verifiedReports: reports
        };
      })
      .sort((a, b) => b.reportCount - a.reportCount);

    return hotspots;
  };

  const hotspotData = createHotspotsFromVerifiedReports();

  const timelineData = [
    { period: "Jan 2024", incidents: 2 },
    { period: "Feb 2024", incidents: 1 },
    { period: "Mar 2024", incidents: 3 },
    { period: "Apr 2024", incidents: 4 },
    { period: "May 2024", incidents: 5 },
    { period: "Jun 2024", incidents: 4 },
    { period: "Jul 2024", incidents: 6 },
    { period: "Aug 2024", incidents: 8 },
    { period: "Sep 2024", incidents: 7 },
    { period: "Oct 2024", incidents: 5 },
    { period: "Nov 2024", incidents: 4 },
    { period: "Dec 2024", incidents: verifiedReports.length }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case "decreasing":
        return <TrendingUp className="h-4 w-4 text-green-600 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "increasing":
        return "text-red-600";
      case "decreasing":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const generateReport = () => {
    alert("Report generated successfully! Download will begin shortly.");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">Hotspot Analysis</h1>
          <p className="text-gray-600">Analysis of regions with multiple verified incidents</p>
        </div>
        <Button onClick={generateReport} className="bg-[#1D7BC1] hover:bg-[#103173]">
          <FileDown className="h-4 w-4 mr-2" />
          Generate Report for Agencies
        </Button>
      </div>

      {hotspotData.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Hotspots Identified</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Hotspots are identified when multiple verified reports occur in the same region. 
              Verify more reports in the Reports page to identify potential hotspots.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Timeline Control */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Time Range: Last {timeRange[0]} months</Label>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Verified Reports Analysis</span>
                  </div>
                </div>
                <Slider
                  value={timeRange}
                  onValueChange={setTimeRange}
                  max={24}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 month</span>
                  <span>12 months</span>
                  <span>24 months</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hotspot Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hotspot List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Verified Report Hotspots</CardTitle>
                  <CardDescription>Regions with multiple verified incidents requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hotspotData.map((hotspot, index) => (
                    <div 
                      key={hotspot.id}
                      className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedHotspot?.id === hotspot.id ? 'bg-[#A0E2F8] border-[#1D7BC1]' : ''
                      }`}
                      onClick={() => setSelectedHotspot(hotspot)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1D7BC1] text-white flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-[#103173]">{hotspot.region}</h4>
                            <p className="text-sm text-gray-600">{hotspot.coordinates}</p>
                          </div>
                        </div>
                        <Badge variant={getRiskColor(hotspot.riskLevel)}>
                          {hotspot.riskLevel} Risk
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Verified Reports</p>
                          <p className="font-semibold">{hotspot.reportCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Report</p>
                          <p className="font-semibold">{hotspot.lastReport}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Trend</p>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(hotspot.trend)}
                            <span className={`font-semibold capitalize ${getTrendColor(hotspot.trend)}`}>
                              {hotspot.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Hotspot Details */}
            <div>
              {selectedHotspot ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Hotspot Details
                      <Badge variant={getRiskColor(selectedHotspot.riskLevel)}>
                        {selectedHotspot.riskLevel} Risk
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedHotspot.region}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="font-medium mb-2">Analysis</h5>
                      <p className="text-sm text-gray-600">{selectedHotspot.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Verified Reports</p>
                        <p className="text-lg font-semibold text-[#103173]">{selectedHotspot.reportCount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Report</p>
                        <p className="text-lg font-semibold text-[#103173]">{selectedHotspot.lastReport}</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Verified Reports</h5>
                      <div className="space-y-2">
                        {selectedHotspot.verifiedReports.map((report) => (
                          <div key={report.id} className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{report.hazardType}</span>
                              <Badge variant={report.severity === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                                {report.severity}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{report.dateTime}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Risk Factors</h5>
                      <div className="space-y-1">
                        {selectedHotspot.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium mb-2">Trend Analysis</h5>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(selectedHotspot.trend)}
                        <span className={`text-sm capitalize ${getTrendColor(selectedHotspot.trend)}`}>
                          {selectedHotspot.trend} incident rate
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="w-full bg-[#1D7BC1] hover:bg-[#103173]"
                        size="sm"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Select a hotspot to view detailed analysis</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Historical Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Verified Reports Timeline</CardTitle>
              <CardDescription>Monthly verified incident counts across all monitored regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Simple bar chart representation */}
                <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
                  {timelineData.map((data, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-75"
                      onClick={() => setSelectedPeriod(data.period)}
                    >
                      <div 
                        className={`w-full rounded-t-md transition-colors ${
                          selectedPeriod === data.period ? 'bg-[#1D7BC1]' : 'bg-[#B9D4E9]'
                        }`}
                        style={{ height: `${Math.max((data.incidents / 10) * 80, 10)}px` }}
                      ></div>
                      <div className="text-xs text-center text-gray-600">
                        <div className="font-medium">{data.incidents}</div>
                        <div className="text-xs">{data.period.split(' ')[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Selected: {selectedPeriod}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#B9D4E9] rounded"></div>
                      <span>Monthly verified reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#1D7BC1] rounded"></div>
                      <span>Selected period</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Hotspots</p>
                    <p className="text-2xl font-semibold text-[#103173]">{hotspotData.length}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-[#1D7BC1]" />
                </div>
                <p className="text-sm text-gray-600 mt-1">Based on verified reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High Risk Regions</p>
                    <p className="text-2xl font-semibold text-[#103173]">
                      {hotspotData.filter(h => h.riskLevel === 'High').length}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-sm text-red-600 mt-1">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Verified Reports</p>
                    <p className="text-2xl font-semibold text-[#103173]">{verifiedReports.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-[#1D7BC1]" />
                </div>
                <p className="text-sm text-green-600 mt-1">Ready for analysis</p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  AlertTriangle, 
  Download,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";

const hazardTypeData = [
  { type: "Coastal Flooding", count: 45, percentage: 38 },
  { type: "Storm Surge", count: 32, percentage: 27 },
  { type: "Tsunami Warning", count: 23, percentage: 19 },
  { type: "High Winds", count: 19, percentage: 16 }
];

const responseTimeData = [
  { month: "Jan", avgTime: 15, target: 20 },
  { month: "Feb", avgTime: 18, target: 20 },
  { month: "Mar", avgTime: 12, target: 20 },
  { month: "Apr", avgTime: 14, target: 20 },
  { month: "May", avgTime: 16, target: 20 },
  { month: "Jun", avgTime: 11, target: 20 },
  { month: "Jul", avgTime: 13, target: 20 },
  { month: "Aug", avgTime: 17, target: 20 },
  { month: "Sep", avgTime: 14, target: 20 },
  { month: "Oct", avgTime: 12, target: 20 },
  { month: "Nov", avgTime: 15, target: 20 },
  { month: "Dec", avgTime: 13, target: 20 }
];

const sourceComparisonData = [
  { source: "Citizen Reports", count: 67, color: "#1D7BC1" },
  { source: "Social Media", count: 52, color: "#67B5DC" },
  { source: "Official Sources", count: 45, color: "#A0E2F8" }
];

const weeklyTrendData = [
  { day: "Mon", reports: 12, verified: 10 },
  { day: "Tue", reports: 19, verified: 16 },
  { day: "Wed", reports: 15, verified: 13 },
  { day: "Thu", reports: 22, verified: 18 },
  { day: "Fri", reports: 25, verified: 21 },
  { day: "Sat", reports: 18, verified: 15 },
  { day: "Sun", reports: 14, verified: 12 }
];

const regionPerformanceData = [
  { region: "California", incidents: 34, responseTime: 12, efficiency: 94 },
  { region: "Florida", incidents: 28, responseTime: 15, efficiency: 89 },
  { region: "Virginia", incidents: 19, responseTime: 18, efficiency: 87 },
  { region: "New Jersey", incidents: 16, responseTime: 14, efficiency: 91 },
  { region: "North Carolina", incidents: 12, responseTime: 16, efficiency: 88 }
];

export function AnalyticsPage() {
  const exportData = (type) => {
    alert(`Exporting ${type} data...`);
  };

  const totalReports = hazardTypeData.reduce((sum, item) => sum + item.count, 0);
  const avgResponseTime = responseTimeData.reduce((sum, item) => sum + item.avgTime, 0) / responseTimeData.length;
  const verificationRate = (weeklyTrendData.reduce((sum, item) => sum + item.verified, 0) / 
                           weeklyTrendData.reduce((sum, item) => sum + item.reports, 0)) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">Analytics</h1>
          <p className="text-gray-600">Performance insights and trend analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportData('charts')}>
            <Download className="h-4 w-4 mr-2" />
            Export Charts
          </Button>
          <Button 
            onClick={() => exportData('full-report')}
            className="bg-[#1D7BC1] hover:bg-[#103173]"
          >
            <Download className="h-4 w-4 mr-2" />
            Full Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-[#103173]">{totalReports}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-[#1D7BC1]" />
            </div>
            <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-semibold text-[#103173]">{avgResponseTime.toFixed(1)}m</p>
              </div>
              <Clock className="h-8 w-8 text-[#1D7BC1]" />
            </div>
            <p className="text-sm text-green-600 mt-1">-3m vs target</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verification Rate</p>
                <p className="text-2xl font-semibold text-[#103173]">{verificationRate.toFixed(1)}%</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-sm text-green-600 mt-1">Above 85% target</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hazard Types Distribution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Reports by Hazard Type</CardTitle>
              <CardDescription>Distribution of incident types in the last 30 days</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => exportData('hazard-types')}>
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hazardTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="type" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1D7BC1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {hazardTypeData.map((item, index) => (
                <div key={index} className="text-center">
                  <Badge variant="secondary" className="mb-1">
                    {item.percentage}%
                  </Badge>
                  <p className="text-xs text-gray-600">{item.type.split(' ')[0]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source Comparison */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Reports by Source</CardTitle>
              <CardDescription>Citizen vs Social Media vs Official sources</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => exportData('source-comparison')}>
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceComparisonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                  >
                    {sourceComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {sourceComparisonData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.source}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Times */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Response Times</CardTitle>
              <CardDescription>Average response time vs target (monthly)</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => exportData('response-times')}>
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#1D7BC1" 
                    strokeWidth={2}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Weekly Report Trends</CardTitle>
              <CardDescription>Total reports vs verified reports by day</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => exportData('weekly-trends')}>
              <Download className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="reports" 
                    stackId="1"
                    stroke="#B9D4E9" 
                    fill="#B9D4E9"
                    name="Total Reports"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="verified" 
                    stackId="2"
                    stroke="#1D7BC1" 
                    fill="#1D7BC1"
                    name="Verified"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Regional Performance</CardTitle>
            <CardDescription>Performance metrics by geographic region</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => exportData('regional-performance')}>
            <Download className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Region</th>
                  <th className="text-left py-3 px-4">Total Incidents</th>
                  <th className="text-left py-3 px-4">Avg Response Time</th>
                  <th className="text-left py-3 px-4">Efficiency Rate</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {regionPerformanceData.map((region, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{region.region}</td>
                    <td className="py-3 px-4">{region.incidents}</td>
                    <td className="py-3 px-4">{region.responseTime}m</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-[#1D7BC1] rounded-full"
                            style={{ width: `${region.efficiency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{region.efficiency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={region.efficiency >= 90 ? "default" : "secondary"}>
                        {region.efficiency >= 90 ? "Excellent" : "Good"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
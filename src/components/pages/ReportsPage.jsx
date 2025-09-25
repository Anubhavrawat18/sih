import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useReports } from "../shared/ReportsContext";
import { 
  Search, 
  Download, 
  Filter, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MapPin,
  Flag,
  Send,
  X
} from "lucide-react";

export function ReportsPage() {
  const { reports, verifyReport, flagReport, getVerifiedReports, getUnverifiedReports } = useReports();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [filters, setFilters] = useState({
    hazardType: "all",
    severity: "all"
  });

  const unverifiedReports = getUnverifiedReports();
  const verifiedReports = getVerifiedReports();

  const filteredUnverifiedReports = unverifiedReports.filter(report => {
    const matchesSearch = report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.hazardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (filters.hazardType === "all" || report.hazardType === filters.hazardType) &&
      (filters.severity === "all" || report.severity === filters.severity);

    return matchesSearch && matchesFilters;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Flagged":
        return <Flag className="h-4 w-4 text-red-600" />;
      case "Unverified":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
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

  const exportData = () => {
    const csvContent = [
      ["ID", "Date/Time", "Hazard Type", "Location", "Source", "Status", "Severity"],
      ...reports.map(report => [
        report.id,
        report.dateTime,
        report.hazardType,
        report.location,
        report.source,
        report.status,
        report.severity
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ocean-guard-reports.csv";
    a.click();
  };

  const openVerificationModal = (report) => {
    setSelectedReport(report);
    setShowVerificationModal(true);
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setSelectedReport(null);
  };

  const handleVerify = (reportId) => {
    verifyReport(reportId);
    closeVerificationModal();
  };

  const handleFlag = (reportId) => {
    flagReport(reportId);
    closeVerificationModal();
  };

  const sendToOfficials = (reportId) => {
    alert(`Report ${reportId} sent to emergency officials successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">Reports Management</h1>
          <p className="text-gray-600">Review and verify incoming hazard reports</p>
        </div>
        <Button onClick={exportData} className="bg-[#1D7BC1] hover:bg-[#103173]">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-2xl font-semibold text-[#103173]">{unverifiedReports.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Reports</p>
                <p className="text-2xl font-semibold text-[#103173]">{verifiedReports.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-[#103173]">{reports.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-[#1D7BC1]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search unverified reports by ID, location, or hazard type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select 
                className="px-3 py-2 border rounded-md text-sm"
                value={filters.hazardType}
                onChange={(e) => setFilters(prev => ({ ...prev, hazardType: e.target.value }))}
              >
                <option value="all">All Types</option>
                <option value="Tsunami Warning">Tsunami Warning</option>
                <option value="Coastal Flooding">Coastal Flooding</option>
                <option value="Storm Surge">Storm Surge</option>
                <option value="High Winds">High Winds</option>
              </select>

              <select 
                className="px-3 py-2 border rounded-md text-sm"
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
              >
                <option value="all">All Severities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unverified Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Unverified Reports ({filteredUnverifiedReports.length})</CardTitle>
          <CardDescription>Reports awaiting verification - click to review details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Hazard Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnverifiedReports.map((report) => (
                  <TableRow 
                    key={report.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => openVerificationModal(report)}
                  >
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell className="text-sm">{report.dateTime}</TableCell>
                    <TableCell>{report.hazardType}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{report.source}</TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(report.severity)}>
                        {report.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        openVerificationModal(report);
                      }}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Verified Reports */}
      {verifiedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Verified Reports ({verifiedReports.length})</CardTitle>
            <CardDescription>Reports that have been verified and are visible on the map</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {verifiedReports.map((report) => (
                <div 
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#103173]">{report.hazardType}</h4>
                        <Badge variant={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{report.location} • {report.dateTime}</p>
                      <p className="text-xs text-gray-500">ID: {report.id}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-[#1D7BC1] hover:bg-[#103173]"
                    onClick={() => sendToOfficials(report.id)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Officials
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Modal */}
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review Report for Verification</DialogTitle>
            <DialogDescription>
              Carefully review the report details before making a decision
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#103173]">{selectedReport.hazardType}</h4>
                  <Badge variant={getSeverityColor(selectedReport.severity)}>
                    {selectedReport.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Report ID: {selectedReport.id}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{selectedReport.dateTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{selectedReport.location}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Coordinates: {selectedReport.coordinates}
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Source</h5>
                <p className="text-sm text-gray-600">{selectedReport.source}</p>
                {selectedReport.reporterInfo && (
                  <p className="text-xs text-gray-500 mt-1">{selectedReport.reporterInfo}</p>
                )}
              </div>

              <div>
                <h5 className="font-medium mb-2">Description</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedReport.description}
                </p>
              </div>

              <div className="pt-4 space-y-2 border-t">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                  onClick={() => handleVerify(selectedReport.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify Report
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  size="sm"
                  onClick={() => handleFlag(selectedReport.id)}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Flag as False
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  size="sm"
                  onClick={closeVerificationModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
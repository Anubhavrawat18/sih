import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import {
  AlertTriangle,
  Plus,
  Send,
  Clock,
  CheckCircle,
  Bell,
  Users,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";

const activeAlerts = [
  {
    id: "ALT-001",
    type: "Tsunami Warning",
    region: "Santa Monica Bay, CA",
    severity: "Critical",
    status: "Active",
    issued: "2024-12-25 14:30",
    recipients: 1247,
    channels: ["SMS", "Email", "Push"],
    description:
      "Tsunami warning issued for coastal areas. Immediate evacuation recommended.",
  },
  {
    id: "ALT-002",
    type: "Coastal Flood Advisory",
    region: "Miami Beach, FL",
    severity: "High",
    status: "Active",
    issued: "2024-12-25 12:15",
    recipients: 856,
    channels: ["Email", "Push"],
    description: "Minor coastal flooding expected during high tide periods.",
  },
  {
    id: "ALT-003",
    type: "Storm Surge Watch",
    region: "Virginia Beach, VA",
    severity: "Medium",
    status: "Resolved",
    issued: "2024-12-24 18:20",
    recipients: 623,
    channels: ["SMS", "Email"],
    description: "Storm surge watch canceled. Conditions have improved.",
  },
];

const notificationHistory = [
  {
    id: 1,
    type: "Alert Sent",
    message: "Tsunami Warning alert sent to 1,247 recipients",
    time: "2h ago",
    status: "success",
  },
  {
    id: 2,
    type: "System Update",
    message: "Emergency contact database updated",
    time: "4h ago",
    status: "info",
  },
  {
    id: 3,
    type: "Alert Delivered",
    message: "Coastal Flood Advisory delivered successfully",
    time: "6h ago",
    status: "success",
  },
  {
    id: 4,
    type: "Failed Delivery",
    message: "12 SMS messages failed to deliver",
    time: "8h ago",
    status: "error",
  },
];

export function AlertsPage() {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({
    type: "",
    region: "",
    severity: "Medium",
    message: "",
    channels: {
      sms: true,
      email: true,
      push: true,
    },
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "destructive";
      case "Resolved":
        return "secondary";
      case "Pending":
        return "default";
      default:
        return "secondary";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "Alert Sent":
        return <Send className="h-4 w-4 text-blue-600" />;
      case "Alert Delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Failed Delivery":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "System Update":
        return <Settings className="h-4 w-4 text-gray-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleCreateAlert = () => {
    // Mock alert creation
    alert("Alert created and sent successfully!");
    setShowCreateAlert(false);
    setNewAlert({
      type: "",
      region: "",
      severity: "Medium",
      message: "",
      channels: { sms: true, email: true, push: true },
    });
  };

  const selectedChannels = Object.entries(newAlert.channels)
    .filter(([_, enabled]) => enabled)
    .map(([channel, _]) => channel.toUpperCase());

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#103173]">
            Alerts & Notifications
          </h1>
          <p className="text-gray-600">
            Manage emergency alerts and communication
          </p>
        </div>
        <Button
          onClick={() => setShowCreateAlert(true)}
          className="bg-[#1D7BC1] hover:bg-[#103173]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Manual Alert
        </Button>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-semibold text-[#103173]">
                  {activeAlerts.filter((a) => a.status === "Active").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recipients Today</p>
                <p className="text-2xl font-semibold text-[#103173]">2,103</p>
              </div>
              <Users className="h-8 w-8 text-[#1D7BC1]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-semibold text-[#103173]">98.2%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-semibold text-[#103173]">2.3m</p>
              </div>
              <Clock className="h-8 w-8 text-[#1D7BC1]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <Card className="border-[#1D7BC1]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Create Manual Alert</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCreateAlert(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alert-type">Alert Type</Label>
                <select
                  id="alert-type"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAlert.type}
                  onChange={(e) =>
                    setNewAlert((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option value="">Select alert type</option>
                  <option value="Tsunami Warning">Tsunami Warning</option>
                  <option value="Coastal Flood Advisory">
                    Coastal Flood Advisory
                  </option>
                  <option value="Storm Surge Watch">Storm Surge Watch</option>
                  <option value="High Wind Warning">High Wind Warning</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  placeholder="e.g., Santa Monica Bay, CA"
                  value={newAlert.region}
                  onChange={(e) =>
                    setNewAlert((prev) => ({ ...prev, region: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <select
                  id="severity"
                  className="w-full px-3 py-2 border rounded-md"
                  value={newAlert.severity}
                  onChange={(e) =>
                    setNewAlert((prev) => ({
                      ...prev,
                      severity: e.target.value,
                    }))
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Delivery Channels</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="sms"
                      checked={newAlert.channels.sms}
                      onCheckedChange={(checked) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          channels: { ...prev.channels, sms: checked },
                        }))
                      }
                    />
                    <Label htmlFor="sms" className="text-sm">
                      SMS
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="email"
                      checked={newAlert.channels.email}
                      onCheckedChange={(checked) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          channels: { ...prev.channels, email: checked },
                        }))
                      }
                    />
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="push"
                      checked={newAlert.channels.push}
                      onCheckedChange={(checked) =>
                        setNewAlert((prev) => ({
                          ...prev,
                          channels: { ...prev.channels, push: checked },
                        }))
                      }
                    />
                    <Label htmlFor="push" className="text-sm">
                      Push Notification
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Alert Message</Label>
              <Textarea
                id="message"
                placeholder="Enter alert message for field teams and emergency responders..."
                rows={3}
                value={newAlert.message}
                onChange={(e) =>
                  setNewAlert((prev) => ({ ...prev, message: e.target.value }))
                }
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-600">
                Estimated recipients: ~1,200 • Channels:{" "}
                {selectedChannels.join(", ") || "None"}
              </div>
              <Button
                onClick={handleCreateAlert}
                className="bg-[#1D7BC1] hover:bg-[#103173]"
                disabled={
                  !newAlert.type || !newAlert.region || !newAlert.message
                }
              >
                <Send className="h-4 w-4 mr-2" />
                Send Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>Currently active emergency alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-[#103173]">{alert.type}</h4>
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <Badge variant={getStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{alert.region}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>ID: {alert.id}</p>
                  <p>{alert.issued}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed">{alert.description}</p>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{alert.recipients} recipients</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{alert.channels.join(", ")}</span>
                  </div>
                </div>
                {alert.status === "Active" && (
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>
            Recent alert delivery status and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificationHistory.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
                <Badge
                  variant={
                    notification.status === "success"
                      ? "default"
                      : notification.status === "error"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {notification.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

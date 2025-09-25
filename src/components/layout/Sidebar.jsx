import {
  Map,
  FileText,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Map, path: "/dashboard" },
  { id: "reports", label: "Reports", icon: FileText, path: "/reports" },
  {
    id: "hotspots",
    label: "Hotspot Analysis",
    icon: TrendingUp,
    path: "/hotspots",
  },
  {
    id: "alerts",
    label: "Alerts & Notifications",
    icon: AlertTriangle,
    path: "/alerts",
  },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "profile", label: "Profile", icon: Settings, path: "/profile" },
  { id: "help", label: "Help/Support", icon: HelpCircle, path: "/help" },
];

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden mb-4"
          >
            <X className="h-4 w-4" />
          </Button>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.id} to={item.path} onClick={onClose}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      isActive && "bg-[#A0E2F8] text-[#103173] font-medium"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

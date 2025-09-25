import { 
  Map, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  HelpCircle,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Map },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "hotspots", label: "Hotspot Analysis", icon: TrendingUp },
  { id: "alerts", label: "Alerts & Notifications", icon: AlertTriangle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: Settings },
  { id: "help", label: "Help/Support", icon: HelpCircle },
];

export function Sidebar({ activeView, onViewChange, isOpen, onClose }) {
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
      <aside className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
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
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    activeView === item.id && "bg-[#A0E2F8] text-[#103173] font-medium"
                  )}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
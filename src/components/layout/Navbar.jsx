import { User, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Navbar({ onToggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1D7BC1] to-[#67B5DC] flex items-center justify-center">
            <span className="text-white font-bold text-sm">OG</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-[#103173]">
              Ocean Guard
            </h1>
            <p className="text-xs text-gray-600">
              Real-Time Coastal Hazard Intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-[#B9D4E9] text-[#103173]">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

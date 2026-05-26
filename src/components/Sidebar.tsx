import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Users,
  Stethoscope,
  FlaskConical,
  Pill,
  Zap,
  FileText,
  Lock,
  Settings,
  ChevronDown,
} from "lucide-react";
import { sidebarMenuItems, currentUser } from "../data/mockData";

const iconMap: Record<string, React.ComponentType<any>> = {
  BarChart3,
  Building2,
  Users,
  Stethoscope,
  FlaskConical,
  Pill,
  Zap,
  FileText,
  Lock,
  Settings,
};

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-gray-200 flex-shrink-0 flex justify-center">
  <img src="/jiva-logo.svg" alt="Jiva" className="h-10 w-auto" />
</div>
      {/* Menu Items - Scrollable */}
      <nav className="flex-1 px-3 md:px-4 py-4 md:py-6 space-y-1 overflow-y-auto">
        {sidebarMenuItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base whitespace-nowrap ${
                active
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {Icon && <Icon size={20} className="flex-shrink-0" />}
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-3 md:p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors min-w-0">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{currentUser.role}</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}

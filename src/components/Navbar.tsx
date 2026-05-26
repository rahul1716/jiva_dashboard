import { Search, Bell, Settings, Menu } from "lucide-react";
import { currentUser } from "../data/mockData";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-4 z-50">
      {/* Menu Button (Mobile) */}
      <button
        onClick={onMenuClick}
        className="hidden md:hidden text-gray-600 hover:text-gray-900"
      >
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users, orders..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings Icon */}
        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          <Settings size={20} />
        </button>

        {/* Profile Avatar */}
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
        </button>
      </div>
    </nav>
  );
}

import { Search, Bell, Moon } from "lucide-react";
import { useState } from "react";
import { currentUser } from "../data/mockData";
interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-13 flex items-center px-5 gap-5 z-50">
      {/* Sidebar toggle */}
      <button
        onClick={onMenuClick}
        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Dark mode */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          <Moon size={18} />
        </button>

        {/* Notifications */}
        <button
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold border-2 border-white">
            1
          </span>
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2.5 pl-3 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white text-xs font-bold flex items-center justify-center shadow-md border-2 border-green-100 group-hover:shadow-lg group-hover:border-green-200 transition-all">
            {currentUser.initials}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-gray-700">
              {currentUser.name}
            </p>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
          </div>
        </button>
      </div>
    </nav>
  );
}

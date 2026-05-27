import { Search, Bell, Clock, Moon } from "lucide-react";
import { currentUser } from "../data/mockData";
import { useState } from "react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <nav className="fixed top-0 left-64 right-0 bg-white border-b border-gray-200 h-16 flex items-center px-6 gap-8 z-50">
      {/* Left Icon */}
      <div className="text-gray-700 flex-shrink-0">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </div>

      {/* Center Search Bar - Search User */}
      <div className="flex-1 max-w-2xl mx-auto">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search user"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-12 pr-5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-400 transition-all"
          />
        </div>
      </div>

      {/* Right Side Icons & Admin - Darker */}
      <div className="flex items-center gap-5 flex-shrink-0">
        {/* Clock Icon - Darker */}
        <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 p-2 rounded-lg">
          <Clock size={20} />
        </button>

        {/* Notification Icon with Badge - Darker */}
        <button className="relative text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 p-2 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
            1
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:bg-gray-100 p-2 rounded-lg"
        >
          <Moon size={20} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Profile Avatar - Admin - Darker styling */}
        <button className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 transform border border-gray-600">
          AD
        </button>
      </div>
    </nav>
  );
}

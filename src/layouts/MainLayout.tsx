import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X, Search, Moon, Bell } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 fixed inset-y-0 left-0 bg-white border-r border-gray-200 flex">
          <Sidebar />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <div
          className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col w-full ${!isMobile ? "ml-64" : ""}`}>
        {/* Navbar */}
        <nav
          className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-5 gap-4 z-50 ${
            !isMobile ? "left-64" : "left-0"
          }`}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors -ml-1"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Sidebar grid icon — desktop only */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors flex-shrink-0"
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

          {/* Search Bar */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Dark Mode */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Moon size={18} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold border-2 border-white">
                1
              </span>
            </button>

            {/* Avatar */}
            <button className="w-8 h-8 rounded-full bg-green-600 text-white text-xs font-semibold flex items-center justify-center ml-1 flex-shrink-0">
              RV
            </button>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pt-20 pb-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
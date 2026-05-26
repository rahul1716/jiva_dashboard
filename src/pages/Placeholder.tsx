import { useNavigate } from "react-router-dom";

const placeholderPages = [
  { title: "Lab Test Booking", path: "/lab-tests" },
  { title: "Medicine Orders", path: "/medicine-orders" },
  { title: "Ambulance Booking", path: "/ambulance" },
  { title: "Reports & History", path: "/reports" },
  { title: "User Access", path: "/access" },
  { title: "Settings", path: "/settings" },
];

export default function PlaceholderPage() {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const page = placeholderPages.find(p => p.path === currentPath);
  const title = page?.title || "Page";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600 mt-1">Manage {title.toLowerCase()}</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-6">{title} features will be available soon</p>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

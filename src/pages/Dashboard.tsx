import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Eye, Edit2, Trash2 } from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import { mockUsers } from "../data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || user.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleEdit = (user: any) => {
    navigate(`/users/${user.id}`);
  };

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
    setCurrentPage(1);
  };

  // Calculate stats
  const totalUsers = users.length;
  const primeUsers = users.filter((u) => u.isPrime).length;
  const normalUsers = totalUsers - primeUsers;
  const totalFamilyMembers = 49; // From mock data

  return (
    <div className="space-y-6">
      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full sm:w-auto"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total User */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-sm font-medium">Total User</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
        </div>

        {/* Prime User */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-sm font-medium">Prime User</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">{primeUsers}</p>
        </div>

        {/* Non-Prime User */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-sm font-medium">Non-Prime User</p>
          <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">{normalUsers}</p>
        </div>

        {/* Total Family members */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <p className="text-gray-600 text-sm font-medium">Total Family members</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">{totalFamilyMembers}</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by patient, doctor, or specialty..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm font-medium"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <Filter size={18} />
              All Status
            </button>
          </div>
        </div>
      </div>

      {/* Users List - Card Style */}
      <div className="space-y-4">
        {paginatedUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: Avatar and Basic Info */}
              <div className="flex gap-4 flex-1">
                {/* Avatar */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-gray-900 text-base">{user.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {user.role || "Patient"}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Normal User</p>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">📧</span>
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">📞</span>
                      <span>{user.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle: Dates and Appointments - Hidden on Mobile */}
              <div className="hidden sm:flex gap-6 items-center">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-900">{user.joinedDate}</p>
                  <p className="text-xs text-gray-400">Last: 2026-03-21</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex gap-2 flex-wrap sm:flex-col sm:gap-3">
                {user.isPrime ? (
                  <button className="px-3 py-2 bg-green-100 text-green-700 rounded font-medium text-sm hover:bg-green-200 transition-colors flex items-center justify-center gap-1 flex-1 sm:flex-none">
                    ✓ Prime
                  </button>
                ) : (
                  <button className="px-3 py-2 bg-orange-100 text-orange-700 rounded font-medium text-sm hover:bg-orange-200 transition-colors flex items-center justify-center gap-1 flex-1 sm:flex-none">
                     Upgrade to Prime
                  </button>
                )}
                <div className="flex gap-2 flex-1 sm:flex-none">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {paginatedUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 px-4 sm:px-6 py-4">
        <p className="text-sm text-gray-600">
          Showing {paginatedUsers.length} of {filteredUsers.length} users (Page {currentPage} of {totalPages})
        </p>
        <div className="flex gap-2 flex-wrap">
          <button 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Show first 5 pages or pages around current page
            if (totalPages <= 5) {
              return i + 1;
            }
            if (currentPage <= 3) {
              return i + 1;
            }
            if (currentPage >= totalPages - 2) {
              return totalPages - 4 + i;
            }
            return currentPage - 2 + i;
          }).map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

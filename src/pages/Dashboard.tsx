import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  ChevronDown,
  Check,
  Phone,
  Mail,
} from "lucide-react";
import AddUserModal from "../components/AddUserModal";
import { mockUsers } from "../data/mockData";

// ─── Custom Dropdown ──────────────────────────────────────────────────────────
function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[130px]"
      >
        <span className="flex-1 text-left">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-1">
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {opt.label}
                {active && (
                  <Check size={14} className="text-gray-800 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterGender, setFilterGender] = useState("All");
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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };
  const handleEdit = (user: any) => navigate(`/users/${user.id}`);
  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
    setCurrentPage(1);
  };

  const totalUsers = users.length;
  const primeUsers = users.filter((u) => u.isPrime).length;
  const normalUsers = totalUsers - primeUsers;
  const totalFamilyMembers = 49;

  return (
    <div className="space-y-6">
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            User Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full sm:w-auto"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: totalUsers, color: "text-gray-900" },
          { label: "Prime Users", value: primeUsers, color: "text-green-600" },
          {
            label: "Non-Prime Users",
            value: normalUsers,
            color: "text-orange-500",
          },
          {
            label: "Total Family Members",
            value: totalFamilyMembers,
            color: "text-blue-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
          >
            <p className="text-gray-500 text-sm font-medium">{s.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold mt-2 ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex gap-2 flex-wrap">
            <CustomDropdown
              value={filterStatus}
              onChange={(v) => {
                setFilterStatus(v);
                setCurrentPage(1);
              }}
              options={[
                { value: "All", label: "All Status" },
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              placeholder="All Status"
            />
            <CustomDropdown
              value={filterGender}
              onChange={(v) => {
                setFilterGender(v);
                setCurrentPage(1);
              }}
              options={[
                { value: "All", label: "All" },
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "13-17", label: "13–17 years" },
                { value: "18-35", label: "18–35 years" },
                { value: "36-59", label: "36–59 years" },
                { value: "60+", label: "60+ years" },
              ]}
              placeholder="More"
            />
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="space-y-3">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="flex gap-3 flex-1 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {user.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-medium">
                      {user.role || "Patient"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium border ${
                        user.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-100"
                          : "bg-red-50 text-red-600 border-red-100"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Normal User</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="truncate flex items-center gap-1">
  <Mail size={16} className="text-gray-400 flex-shrink-0" />
  {user.email}
</span>
                    <span>
                      <Phone size={16} className="inline mr-1 text-gray-400" />
                      {user.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle */}
              <div className="hidden sm:flex gap-8 items-center px-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-0.5">Joined</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.joinedDate}
                  </p>
                  <p className="text-xs text-gray-400">Last: 2026-03-21</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-0.5">Appointments</p>
                  <p className="text-2xl font-bold text-blue-600">8</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-2 flex-wrap sm:flex-nowrap items-center">
                {user.isPrime ? (
                  <span className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-lg text-xs font-semibold">
                    ✓ Prime
                  </span>
                ) : (
                  <button className="px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-lg text-xs font-semibold hover:bg-orange-100 transition-colors">
                    Upgrade to Prime
                  </button>
                )}
                <button
                  onClick={() => handleEdit(user)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600"
                >
                  <Eye size={14} /> View
                </button>
                <button
                  onClick={() => handleEdit(user)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs font-medium text-gray-600"
                >
                  <Edit2 size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {paginatedUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-400 text-sm">No users found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 px-4 sm:px-6 py-4">
        <p className="text-sm text-gray-500">
          Showing {paginatedUsers.length} of {filteredUsers.length} users · Page{" "}
          {currentPage} of {totalPages}
        </p>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            if (totalPages <= 5) return i + 1;
            if (currentPage <= 3) return i + 1;
            if (currentPage >= totalPages - 2) return totalPages - 4 + i;
            return currentPage - 2 + i;
          }).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

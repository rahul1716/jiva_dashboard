import { Link } from "react-router-dom";
import { Edit2, Eye, Trash2, Star } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  role: string;
  joinedDate: string;
  lastActive: string;
  appointments: number;
  isPrime: boolean;
  avatar: string;
}

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [genderFilter, setGenderFilter] = useState("All");
  const [ageRangeFilter, setAgeRangeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Filter Section */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4">
        {/* Gender Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-all"
          >
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Age Range Filter */}
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
          <select
            value={ageRangeFilter}
            onChange={(e) => setAgeRangeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white cursor-pointer hover:border-gray-400 transition-all"
          >
            <option>All</option>
            <option>13–17 years</option>
            <option>18–35 years</option>
            <option>36–59 years</option>
            <option>60+ years</option>
          </select>
        </div>

        {/* Status Filter - Professional Styled */}
        <div className="flex-1 min-w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent bg-white cursor-pointer transition-all border-2 appearance-none ${
              statusFilter === "Active"
                ? "border-blue-500 text-blue-700 bg-blue-50 hover:bg-blue-100"
                : statusFilter === "Inactive"
                ? "border-gray-400 text-gray-700 hover:border-gray-500 hover:bg-gray-50"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            <option value="All" className="text-gray-700">All Status</option>
            <option value="Active" className="text-gray-900 font-medium">✓ Active</option>
            <option value="Inactive" className="text-gray-900 font-medium">○ Inactive</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Appointments
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {user.isPrime && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded">
                            <Star size={12} />
                            Prime
                          </span>
                        )}
                        <span className="text-xs text-gray-500">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{user.joinedDate}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {user.appointments}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/users/${user.id}`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => onEdit?.(user)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete?.(user.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {user.isPrime && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-medium rounded">
                          <Star size={12} />
                          Prime
                        </span>
                      )}
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  <p className="text-gray-900 font-medium text-xs break-all">
                    {user.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Joined</p>
                  <p className="text-gray-900 font-medium text-xs">
                    {user.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="flex gap-1">
                  <Link
                    to={`/users/${user.id}`}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>
                  <button
                    onClick={() => onEdit?.(user)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete?.(user.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {user.appointments} appts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

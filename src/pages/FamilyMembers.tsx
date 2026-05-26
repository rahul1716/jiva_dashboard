import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit2, Trash2, Phone, Mail } from "lucide-react";
import { mockFamilyMembers } from "../data/mockData";

export default function FamilyMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState(mockFamilyMembers);

  const handleDelete = (memberId: number) => {
    if (confirm("Are you sure you want to remove this family member?")) {
      setMembers(members.filter((m) => m.id !== memberId));
    }
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: Record<string, string> = {
      Spouse: "bg-pink-50 text-pink-700",
      Daughter: "bg-purple-50 text-purple-700",
      Son: "bg-blue-50 text-blue-700",
      Father: "bg-gray-50 text-gray-700",
      Mother: "bg-rose-50 text-rose-700",
      Sister: "bg-indigo-50 text-indigo-700",
      Brother: "bg-cyan-50 text-cyan-700",
    };
    return colors[relationship] || "bg-gray-50 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Family Members</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Manage family members connected to this account
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full sm:w-auto">
          <Plus size={20} />
          <span className="hidden sm:inline">Add Member</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-600 text-sm">Total Family Members</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{members.length}</p>
      </div>

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 flex items-start justify-between">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-lg border-4 border-white"
              />
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${getRelationshipColor(
                    member.relationship
                  )}`}
                >
                  {member.relationship}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Age:</span>
                  <span>{member.age} years</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium">Blood Group:</span>
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-semibold">
                    {member.bloodGroup}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span className="text-gray-600">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-gray-600 truncate">{member.email}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal (Placeholder) */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Family Member
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Relationship
            </label>
            <select className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm">
              <option>Select relationship</option>
              <option>Spouse</option>
              <option>Son</option>
              <option>Daughter</option>
              <option>Father</option>
              <option>Mother</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Blood Group
            </label>
            <input
              type="text"
              placeholder="Enter blood group"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter phone"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 mt-4 sm:mt-6">
          <button className="flex-1 px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            Add Member
          </button>
          <button className="flex-1 px-4 sm:px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

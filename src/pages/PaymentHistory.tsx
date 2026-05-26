import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Eye, Filter } from "lucide-react";
import { mockPaymentHistory } from "../data/mockData";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(mockPaymentHistory);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredPayments = payments.filter((payment) =>
    filterStatus === "All" ? true : payment.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700";
      case "Failed":
        return "bg-red-50 text-red-700";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const totalAmount = filteredPayments
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + parseFloat(p.amount.replace("₹", "")), 0);

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600 mt-1 text-sm">View all transaction history</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full sm:w-auto">
          <Download size={20} />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Total Transactions</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {filteredPayments.length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {filteredPayments.filter((p) => p.status === "Completed").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm">Total Amount</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ₹{totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 flex gap-2 sm:gap-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
          <Filter size={18} />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      {payment.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {payment.description}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{payment.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {payment.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg border border-gray-200 px-4 sm:px-6 py-4">
        <p className="text-sm text-gray-600">
          Showing {filteredPayments.length} of {payments.length} payments
        </p>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Previous
          </button>
          <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm">
            1
          </button>
          <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

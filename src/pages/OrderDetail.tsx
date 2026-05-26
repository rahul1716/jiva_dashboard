import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package, Truck, Clock } from "lucide-react";
import { mockOrders } from "../data/mockData";

export default function OrderDetail() {
  const navigate = useNavigate();
  const orders = mockOrders;

  const totalAmount = orders.reduce(
    (sum, order) => sum + parseFloat(order.totalPrice.replace("₹", "")),
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Transit":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Package size={18} />;
      case "In Transit":
        return <Truck size={18} />;
      case "Pending":
        return <Clock size={18} />;
      default:
        return <Package size={18} />;
    }
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
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Details</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Manage and view user order information
        </p>
      </div>

      {/* Order Items */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Product Image */}
              <img
                src={order.image}
                alt={order.medicineName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-100 flex-shrink-0"
              />

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 w-full">
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                      {order.medicineName}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span>Qty: {order.quantity}</span>
                      <span>Price: {order.price}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex flex-col items-start sm:items-end gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                    <p className="text-xs text-gray-500">
                      Est. {order.deliveryDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  {order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>₹0.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-lg text-gray-900">
              ₹{(totalAmount * 1.18).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Download Invoice
          </button>
          <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Track Order
          </button>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Delivery Timeline
        </h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="w-1 h-12 bg-gray-300 mt-2"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Order Placed</p>
              <p className="text-sm text-gray-600">May 15, 2024 • 10:30 AM</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="w-1 h-12 bg-gray-300 mt-2"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Order Confirmed</p>
              <p className="text-sm text-gray-600">May 15, 2024 • 11:45 AM</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="w-1 h-12 bg-gray-300 mt-2"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Out for Delivery</p>
              <p className="text-sm text-gray-600">May 20, 2024 • 8:00 AM</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <div>
              <p className="font-medium text-gray-900">Delivered</p>
              <p className="text-sm text-gray-600">May 20, 2024 • 4:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit2,
  Download,
  Eye,
  Plus,
  Trash2,
  Package,
  FlaskConical,
  Stethoscope,
  CreditCard,
  Phone,
  Calendar,
  Home,
  Heart,
  CheckCircle2,
  Pill,
  Mail,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusFilter from "../components/StatusFilter";
import { mockUserDetail, mockUsers } from "../data/mockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function statusColor(status: string) {
  switch (status) {
    case "Completed":
    case "Delivered":
      return "bg-green-50 text-green-700";
    case "Pending":
      return "bg-yellow-50 text-yellow-700";
    case "Cancelled":
      return "bg-red-50 text-red-600";
    case "Refunded":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function OrderIcon({ type }: { type: string }) {
  const base =
    "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0";
  if (type === "lab")
    return (
      <div className={`${base} bg-purple-50`}>
        <FlaskConical size={16} className="text-purple-600" />
      </div>
    );
  if (type === "consultation")
    return (
      <div className={`${base} bg-blue-50`}>
        <Stethoscope size={16} className="text-blue-600" />
      </div>
    );
  return (
    <div className={`${base} bg-green-50`}>
      <Package size={16} className="text-green-600" />
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const base =
    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0";
  if (type === "check")
    return (
      <div className={`${base} bg-green-50`}>
        <CheckCircle2 size={20} className="text-green-600" />
      </div>
    );
  if (type === "pill")
    return (
      <div className={`${base} bg-blue-50`}>
        <Pill size={20} className="text-blue-600" />
      </div>
    );
  if (type === "flask")
    return (
      <div className={`${base} bg-purple-50`}>
        <FlaskConical size={20} className="text-purple-600" />
      </div>
    );
  return (
    <div className={`${base} bg-gray-50`}>
      <Package size={20} className="text-gray-600" />
    </div>
  );
}

// ─── Mock tab data (replace with real API data as needed) ─────────────────────
const mockOrders = [
  {
    id: "ORD-1001",
    type: "medicine",
    title: "Paracetamol 500mg - 30 tablets",
    date: "March 28, 2026",
    amount: "₹ 250.00",
    status: "Delivered",
    detail: "Delivered in 2 days",
  },
  {
    id: "ORD-1002",
    type: "lab",
    title: "Complete Blood Count (CBC)",
    date: "March 25, 2026",
    amount: "₹ 450.00",
    status: "Completed",
    detail: "Report available",
  },
  {
    id: "ORD-1003",
    type: "consultation",
    title: "Dr. Ramesh Sharma – General Physician",
    date: "March 20, 2026",
    amount: "₹ 300.00",
    status: "Completed",
    detail: "Video consultation",
  },
  {
    id: "ORD-1004",
    type: "medicine",
    title: "Vitamin D3 60K IU - 4 capsules",
    date: "March 15, 2026",
    amount: "₹ 180.00",
    status: "Cancelled",
    detail: "Cancelled by user",
  },
];

const mockBookings = [
  {
    id: "BK-2001",
    type: "consultation",
    title: "General Checkup",
    doctor: "Dr. Sarah Johnson",
    date: "4/5/2026",
    time: "10:00 AM",
    amount: "₹ 250.00",
    status: "Confirmed",
    detail: "Consultation confirmed",
  },
  {
    id: "BK-2002",
    type: "lab",
    title: "Complete Blood Count",
    location: "City Lab",
    date: "4/8/2026",
    time: "9:30 AM",
    amount: "₹ 350.00",
    status: "Scheduled",
    detail: "Lab test scheduled",
  },
  {
    id: "BK-2003",
    type: "consultation",
    title: "Skin Treatment",
    doctor: "Dr. Priya Nair",
    date: "4/10/2026",
    time: "2:15 PM",
    amount: "₹ 500.00",
    status: "Confirmed",
    detail: "Video consultation confirmed",
  },
  {
    id: "BK-2004",
    type: "lab",
    title: "Thyroid Profile Test",
    location: "Apex Diagnostics",
    date: "4/12/2026",
    time: "8:00 AM",
    amount: "₹ 450.00",
    status: "Scheduled",
    detail: "Lab test scheduled",
  },
  {
    id: "BK-2005",
    type: "consultation",
    title: "Cardiac Checkup",
    doctor: "Dr. Ramesh Sharma",
    date: "4/15/2026",
    time: "11:30 AM",
    amount: "₹ 600.00",
    status: "Confirmed",
    detail: "Consultation confirmed",
  },
  {
    id: "BK-2006",
    type: "lab",
    title: "Kidney Function Test",
    location: "Metro Lab",
    date: "4/18/2026",
    time: "10:00 AM",
    amount: "₹ 300.00",
    status: "Pending",
    detail: "Awaiting confirmation",
  },
];

const mockPastBookings = [
  {
    id: "BK-1901",
    type: "consultation",
    title: "Eye Checkup",
    doctor: "Dr. Amit Patel",
    date: "3/28/2026",
    time: "3:00 PM",
    amount: "₹ 200.00",
    status: "Completed",
    detail: "Consultation completed",
  },
  {
    id: "BK-1902",
    type: "lab",
    title: "Liver Function Test",
    location: "Quest Lab",
    date: "3/25/2026",
    time: "7:30 AM",
    amount: "₹ 400.00",
    status: "Completed",
    detail: "Report available",
  },
  {
    id: "BK-1903",
    type: "consultation",
    title: "General Consultation",
    doctor: "Dr. Meera Singh",
    date: "3/20/2026",
    time: "4:30 PM",
    amount: "₹ 150.00",
    status: "Completed",
    detail: "Consultation completed",
  },
  {
    id: "BK-1904",
    type: "lab",
    title: "COVID-19 RT PCR",
    location: "City Lab",
    date: "3/15/2026",
    time: "10:00 AM",
    amount: "₹ 350.00",
    status: "Completed",
    detail: "Report available",
  },
];

const mockPayments = [
  {
    id: 1,
    title: "Consultation Fee",
    subtitle: "Dr. Ramesh Sharma – General Physician",
    date: "March 28, 2026",
    amount: "₹ 150.00",
    status: "Completed",
    txnId: "TXN78234",
  },
  {
    id: 2,
    title: "Lab Test",
    subtitle: "Complete Blood Count (CBC)",
    date: "March 25, 2026",
    amount: "₹ 80.00",
    status: "Completed",
    txnId: "TXN78101",
  },
  {
    id: 3,
    title: "Medicine Order",
    subtitle: "Paracetamol 500mg - 30 tablets",
    date: "March 20, 2026",
    amount: "₹ 250.00",
    status: "Refunded",
    txnId: "TXN77990",
  },
  {
    id: 4,
    title: "Consultation Fee",
    subtitle: "Dr. Priya Nair – Dermatologist",
    date: "March 10, 2026",
    amount: "₹ 500.00",
    status: "Pending",
    txnId: "TXN77805",
  },
];

const mockRecentActivity = [
  {
    id: 1,
    type: "consultation",
    title: "Consultation Completed",
    subtitle: "with Dr. Sarah Johnson - General Checkup",
    date: "2 days ago",
    icon: "check",
  },
  {
    id: 2,
    type: "medicine",
    title: "Medicine Order Placed",
    subtitle: "Order #1002 - Amoxicillin 250mg",
    date: "1 day ago",
    icon: "pill",
  },
  {
    id: 3,
    type: "lab",
    title: "Lab Test Scheduled",
    subtitle: "Complete Blood Count - City Lab",
    date: "3 days ago",
    icon: "flask",
  },
];

// ─── Tab Section Components ───────────────────────────────────────────────────
function OrdersBookingsTab({
  orders,
  bookings,
  pastBookings,
  onDeleteOrder,
  onDeleteBooking,
  onDeletePastBooking,
}: {
  orders: any[];
  bookings: any[];
  pastBookings: any[];
  onDeleteOrder: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  onDeletePastBooking: (id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Orders Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-base font-semibold text-gray-900">
            Order History
          </h3>
          <span className="text-xs sm:text-sm text-gray-400">
            {orders.length} orders
          </span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <OrderIcon type={order.type} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {order.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {order.id} · {order.date} · {order.detail}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {order.amount}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded">
                    <Eye size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteOrder(order.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-base font-semibold text-gray-900">
            Upcoming Bookings
          </h3>
          <span className="text-xs sm:text-sm text-gray-400">
            {bookings.length} bookings
          </span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <OrderIcon type={booking.type} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {booking.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {booking.id} · {booking.date} {booking.time} ·{" "}
                  {booking.doctor || booking.location}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {booking.amount}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded font-medium text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={() => onDeleteBooking(booking.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Bookings Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-base font-semibold text-gray-900">
            Past Bookings
          </h3>
          <span className="text-xs sm:text-sm text-gray-400">
            {pastBookings.length} bookings
          </span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {pastBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors opacity-75"
            >
              <OrderIcon type={booking.type} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {booking.title}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${statusColor(booking.status)}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {booking.id} · {booking.date} {booking.time} ·{" "}
                  {booking.doctor || booking.location}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {booking.amount}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onDeletePastBooking(booking.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsTab() {
  const totalPaid = mockPayments
    .filter((p) => p.status === "Completed")
    .reduce((acc, p) => acc + parseFloat(p.amount.replace("₹ ", "")), 0)
    .toFixed(2);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <h3 className="text-lg sm:text-base font-semibold text-gray-900">
          Payment History
        </h3>
        <button className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500 hover:text-green-600 border border-gray-200 rounded-lg transition-colors font-medium w-full sm:w-auto">
          <Download size={14} />{" "}
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Desktop table header */}
      <div className="hidden sm:grid grid-cols-12 text-xs text-gray-400 font-medium px-4 pb-2 border-b border-gray-100">
        <span className="col-span-4">Description</span>
        <span className="col-span-3">Transaction ID</span>
        <span className="col-span-2">Date</span>
        <span className="col-span-2 text-right">Amount</span>
        <span className="col-span-1 text-right">Status</span>
      </div>

      <div className="divide-y divide-gray-100">
        {mockPayments.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-2 sm:gap-3 sm:grid sm:grid-cols-12 py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm"
          >
            {/* Mobile icon */}
            <div className="w-8 h-8 sm:hidden rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <CreditCard size={14} className="text-green-600" />
            </div>
            {/* Description */}
            <div className="flex-1 sm:col-span-4 min-w-0">
              <p className="font-semibold text-gray-900 truncate text-xs sm:text-sm">
                {p.title}
              </p>
              <p className="text-xs text-gray-400 truncate">{p.subtitle}</p>
            </div>
            {/* Txn ID */}
            <span className="hidden sm:block sm:col-span-3 text-xs text-gray-500 font-mono">
              {p.txnId}
            </span>
            {/* Date */}
            <span className="hidden sm:block sm:col-span-2 text-xs text-gray-500">
              {p.date}
            </span>
            {/* Amount */}
            <span className="text-xs sm:text-sm font-bold text-gray-900 flex-shrink-0 sm:col-span-2 sm:text-right">
              {p.amount}
            </span>
            {/* Status */}
            <div className="flex-shrink-0 sm:col-span-1 sm:text-right">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(p.status)}`}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
        <div className="text-right">
          <p className="text-xs text-gray-400">Total Paid</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            ₹ {totalPaid}
          </p>
        </div>
      </div>
    </div>
  );
}

function FamilyTab({
  members,
  onAddMember,
}: {
  members: any[];
  onAddMember: () => void;
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
        <h3 className="text-lg sm:text-base font-semibold text-gray-900">
          Family Members
        </h3>
        <button
          onClick={onAddMember}
          className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium w-full sm:w-auto"
        >
          <Plus size={14} />{" "}
          <span className="hidden sm:inline">Add Member</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0`}
            >
              {member.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                <p className="text-sm sm:text-base font-semibold text-gray-900">
                  {member.name}
                </p>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {member.relation}
                </span>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-5">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Phone size={11} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{member.phone}</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar size={11} className="text-gray-400 flex-shrink-0" />
                  {member.dob}
                </span>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded">
                <Edit2 size={14} />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  // Get the user from mockUsers array based on the ID, with detailed info from mockUserDetail
  const getUserData = () => {
    const userId = parseInt(id || "1");
    const baseUser = mockUsers.find((u) => u.id === userId);

    if (!baseUser) {
      return mockUserDetail;
    }

    // Merge base user data with detailed user info
    return {
      ...baseUser,
      dob: "5/15/1990",
      gender: "Female",
      bloodGroup: "O+",
      joinedDate: "1/15/2025",
      lastActive: "4/2/2026",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      addresses: [
        {
          id: 1,
          type: "Home",
          address: "Flat 301, Sunshine Apartments, MG Road",
          fullAddress:
            "Flat 301, Sunshine Apartments, MG Road, Mumbai, Maharashtra 400001, India",
          isDefault: true,
        },
        {
          id: 2,
          type: "Home",
          address: "Flat 301, Sunshine Apartments, MG Road",
          fullAddress:
            "Flat 301, Sunshine Apartments, MG Road, Mumbai, Maharashtra 400001, India",
          isDefault: false,
        },
      ],
      isPrime: baseUser.isPrime,
      stats: [
        { label: "Total Orders", value: "6", icon: "ShoppingCart" },
        { label: "Total Booking & Appointment", value: "5", icon: "Calendar" },
        { label: "Total Family Member", value: "10", icon: "Users" },
        { label: "Total Spent", value: "₹24500.00", icon: "DollarSign" },
      ],
    };
  };

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "John Williams",
      relation: "Husband",
      phone: "+91 98001 11112",
      dob: "3/20/1988",
      initials: "JW",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Emma Williams",
      relation: "Daughter",
      phone: "+91 98002 22223",
      dob: "7/14/2012",
      initials: "EW",
      color: "bg-purple-500",
    },
    {
      id: 3,
      name: "Robert Williams",
      relation: "Father-in-law",
      phone: "+91 98003 33334",
      dob: "1/5/1958",
      initials: "RW",
      color: "bg-orange-500",
    },
  ]);
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    relation: "Spouse",
    phone: "",
    dob: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });
  const [userData, setUserData] = useState(() => getUserData());
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    type: "Home",
    fullAddress: "",
    isDefault: false,
  });
  const [orders, setOrders] = useState(mockOrders);
  const [bookings, setBookings] = useState(mockBookings);
  const [pastBookings, setPastBookings] = useState(mockPastBookings);
  const [statusValue, setStatusValue] = useState("Active");

  const user = userData;

  // Update user data when ID changes
  useEffect(() => {
    setUserData(getUserData());
  }, [id]);

  // Initialize addresses when user loads
  useEffect(() => {
    if (user.addresses) {
      setAddresses(user.addresses);
    }
  }, [user.addresses]);

  // Initialize form data when user loads
  useEffect(() => {
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
    });
  }, [user.name, user.email, user.phone, user.status]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    // Update the user data with the edited form data
    setUserData((prevData) => ({
      ...prevData,
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
      status: editFormData.status,
    }));
    // Show success message
    alert(
      `Profile updated successfully!\nName: ${editFormData.name}\nEmail: ${editFormData.email}\nPhone: ${editFormData.phone}\nStatus: ${editFormData.status}`,
    );
    setIsEditModalOpen(false);
  };

  const handleNewMemberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (!newMemberData.name || !newMemberData.phone || !newMemberData.dob) {
      alert("Please fill in all required fields");
      return;
    }

    // Generate initials
    const initials = newMemberData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    // Color options
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-green-500",
      "bg-red-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newMember = {
      id: familyMembers.length + 1,
      name: newMemberData.name,
      relation: newMemberData.relation,
      phone: newMemberData.phone,
      dob: newMemberData.dob,
      initials,
      color: randomColor,
    };

    setFamilyMembers([...familyMembers, newMember]);
    alert(
      `Member Added!\nName: ${newMemberData.name}\nRelation: ${newMemberData.relation}`,
    );
    setNewMemberData({ name: "", relation: "Spouse", phone: "", dob: "" });
    setIsAddMemberModalOpen(false);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as any;
    const inputValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setAddressFormData((prev) => ({ ...prev, [name]: inputValue }));
  };

  const openAddAddressModal = () => {
    setEditingAddressId(null);
    setAddressFormData({
      type: "Home",
      fullAddress: "",
      isDefault: false,
    });
    setIsAddressModalOpen(true);
  };

  const openEditAddressModal = (addr: any) => {
    setEditingAddressId(addr.id);
    setAddressFormData({
      type: addr.type,
      fullAddress: addr.fullAddress,
      isDefault: addr.isDefault,
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (!addressFormData.fullAddress.trim()) {
      alert("Please enter a complete address");
      return;
    }

    if (editingAddressId !== null) {
      // Update existing address
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddressId
          ? { ...addr, ...addressFormData }
          : addressFormData.isDefault
            ? { ...addr, isDefault: false }
            : addr,
      );
      setAddresses(updatedAddresses);
      alert("Address updated successfully!");
    } else {
      // Add new address
      const newAddress = {
        id: Math.max(...addresses.map((a) => a.id), 0) + 1,
        ...addressFormData,
      };
      // If setting as default, unset other defaults
      const updatedAddresses = addressFormData.isDefault
        ? addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
        : addresses.concat(newAddress);
      setAddresses(updatedAddresses);
      alert("Address added successfully!");
    }
    setIsAddressModalOpen(false);
  };

  const handleDeleteAddress = (id: number) => {
    if (confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
      alert("Address deleted successfully!");
    }
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((order) => order.id !== id));
      alert("Order deleted successfully!");
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter((booking) => booking.id !== id));
      alert("Booking cancelled successfully!");
    }
  };

  const handleDeletePastBooking = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setPastBookings(pastBookings.filter((booking) => booking.id !== id));
      alert("Booking deleted successfully!");
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "ordersBookings", label: "Orders & Bookings" },
    { id: "payments", label: "Payments" },
    { id: "family", label: "Family Members" },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/users")}
        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
      >
        <ArrowLeft size={20} />
        Back to User Management
      </button>

      {/* User Profile Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left Side: Avatar + Info */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-2 mb-2">
                {user.status && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded">
                    {user.status}
                  </span>
                )}
                {(user as any).role && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    {(user as any).role}
                  </span>
                )}
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  Normal User
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  ID: #{user.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" />
                  Joined {user.joinedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} className="text-gray-400" />
                  Last active {(user as any).lastActive}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Buttons + Status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium text-sm flex items-center gap-2 justify-center whitespace-nowrap">
              ★ Upgrade to Prime
            </button>
            <div className="flex-1 min-w-48">
              <StatusFilter value={statusValue} onChange={setStatusValue} />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {user.stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-green-600 text-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Two Column Layout: Personal Info (Left) + Addresses (Right) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information - Left Side */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium text-gray-900">
                          {user.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Date of Birth</p>
                        <p className="font-medium text-gray-900">{user.dob}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Eye size={16} className="text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Gender</p>
                        <p className="font-medium text-gray-900">
                          {user.gender}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart
                        size={16}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Blood Group</p>
                        <p className="font-medium text-gray-900">
                          {user.bloodGroup}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addresses - Right Side */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Addresses
                    </h3>
                    <button
                      onClick={openAddAddressModal}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="space-y-3">
                    {addresses &&
                      addresses.map((addr: any) => (
                        <div
                          key={addr.id}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                <Home size={18} className="text-green-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-gray-900">
                                    {addr.type}
                                  </p>
                                  {addr.isDefault && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                      Default
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">
                                  {addr.fullAddress}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => openEditAddressModal(addr)}
                                className="p-1.5 text-gray-400 hover:text-green-600 transition-colors rounded"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Prime Membership */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Premium Membership
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {user.isPrime
                        ? "User has an active premium subscription"
                        : "Upgrade to Premium for exclusive benefits"}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                    {user.isPrime ? "Manage Subscription" : "Upgrade to Prime"}
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 sm:gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <ActivityIcon type={activity.icon} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <h4 className="font-medium text-gray-900">
                            {activity.title}
                          </h4>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {activity.date}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                          {activity.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "ordersBookings" && (
            <OrdersBookingsTab
              orders={orders}
              bookings={bookings}
              pastBookings={pastBookings}
              onDeleteOrder={handleDeleteOrder}
              onDeleteBooking={handleDeleteBooking}
              onDeletePastBooking={handleDeletePastBooking}
            />
          )}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "family" && (
            <FamilyTab
              members={familyMembers}
              onAddMember={() => setIsAddMemberModalOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Add Family Member
              </h2>
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Sarah Williams"
                  value={newMemberData.name}
                  onChange={handleNewMemberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relation *
                </label>
                <select
                  name="relation"
                  value={newMemberData.relation}
                  onChange={handleNewMemberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Spouse</option>
                  <option>Son</option>
                  <option>Daughter</option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Brother</option>
                  <option>Sister</option>
                  <option>Father-in-law</option>
                  <option>Mother-in-law</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={newMemberData.phone}
                  onChange={handleNewMemberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={newMemberData.dob}
                  onChange={handleNewMemberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddMemberModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingAddressId ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Type *
                </label>
                <select
                  name="type"
                  value={addressFormData.type}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complete Address *
                </label>
                <textarea
                  name="fullAddress"
                  placeholder="Enter full address including street, city, state, postal code..."
                  value={addressFormData.fullAddress}
                  onChange={handleAddressChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={addressFormData.isDefault}
                  onChange={handleAddressChange}
                  className="w-4 h-4 rounded border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {editingAddressId ? "Update Address" : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import {
  Users,
  Star,
  BarChart3,
  ShoppingCart,
  Calendar,
  DollarSign,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  bgColor?: string;
  textColor?: string;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Star,
  BarChart3,
  ShoppingCart,
  Calendar,
  DollarSign,
};

export default function StatCard({
  title,
  value,
  icon,
  bgColor = "bg-blue-50",
  textColor = "text-blue-600",
}: StatCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`${bgColor} ${textColor} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Users, CircleDot, CircleOff } from "lucide-react";

const options = [
  {
    value: "All",
    label: "All Status",
    icon: Users,
    dot: "bg-gray-400",
    active: "bg-white border-gray-200 text-gray-700",
    hover: "hover:border-gray-300 hover:bg-gray-50",
    badge: "bg-gray-100 text-gray-600",
  },
  {
    value: "Active",
    label: "Active",
    icon: CircleDot,
    dot: "bg-green-500",
    active: "bg-green-50 border-green-400 text-green-700",
    hover: "hover:border-green-400 hover:bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: CircleOff,
    dot: "bg-gray-400",
    active: "bg-gray-50 border-gray-400 text-gray-600",
    hover: "hover:border-gray-400 hover:bg-gray-50",
    badge: "bg-gray-100 text-gray-500",
  },
];

export default function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-400 ${selected.active} ${!open ? selected.hover : ""}`}
      >
        {/* dot */}
        <span
          className={`w-2 h-2 rounded-full flex-shrink-0 ${selected.dot}`}
        />
        <span className="flex-1 text-left">{selected.label}</span>
        <ChevronDown
          size={15}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-1.5">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isSelected ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                {/* dot */}
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.dot}`}
                />
                {/* label */}
                <span
                  className={`flex-1 text-left font-medium ${isSelected ? "text-gray-900" : "text-gray-600"}`}
                >
                  {opt.label}
                </span>
                {/* checkmark */}
                {isSelected && (
                  <Check
                    size={15}
                    className="text-gray-800 flex-shrink-0"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

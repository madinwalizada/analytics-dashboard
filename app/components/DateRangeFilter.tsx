"use client";

type Range = "7d" | "30d" | "90d" | "12m";

type Props = {
  selected: Range;
  onChange: (range: Range) => void;
};

const options: { label: string; value: Range }[] = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "Last 12 months", value: "12m" },
];

export default function DateRangeFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
            ${
              selected === opt.value
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

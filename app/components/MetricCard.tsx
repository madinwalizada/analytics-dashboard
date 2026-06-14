type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  positive: boolean;
};

export default function MetricCard({
  title,
  value,
  change,
  positive,
}: MetricCardProps) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm 
                border border-gray-100 dark:border-gray-700"
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        {value}
      </p>
      <p
        className={`text-sm mt-2 font-medium ${
          positive ? "text-green-600" : "text-red-500"
        }`}
      >
        {change} vs last month
      </p>
    </div>
  );
}

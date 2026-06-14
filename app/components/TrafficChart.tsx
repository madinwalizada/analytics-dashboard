"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type TrafficRow = {
  source: string;
  visits: number;
};

type ChartRow = {
  name: string;
  value: number;
};

const COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706"];

export default function TrafficChart() {
  const [data, setData] = useState<ChartRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTraffic() {
      const { data, error } = await supabase
        .from("traffic")
        .select("source, visits");

      if (error) console.error(error);
      else {
        // Convert visits to percentages for the chart
        const total = data.reduce((sum, row) => sum + row.visits, 0);
        const formatted = data.map((row: TrafficRow) => ({
          name: row.source,
          value: Math.round((row.visits / total) * 100),
        }));
        setData(formatted);
      }

      setLoading(false);
    }

    fetchTraffic();
  }, []);

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-gray-400 text-sm">Loading chart...</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">
        Traffic Sources
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

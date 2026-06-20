"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RevenueRow = {
  month: string;
  amount: number;
};

const rangeMap = {
  "7d": 2,
  "30d": 3,
  "90d": 6,
  "12m": 12,
};

type Props = {
  range: "7d" | "30d" | "90d" | "12m";
};

export default function RevenueChart({ range }: Props) {
  const [allData, setAllData] = useState<RevenueRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRevenue() {
      const { data, error } = await supabase
        .from("revenue")
        .select("month, amount")
        .order("id", { ascending: true });

      if (error) console.error(error);
      else setAllData(data);

      setLoading(false);
    }

    fetchRevenue();
  }, []);

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-gray-400 text-sm">Loading chart...</p>
      </div>
    );

  const data = allData.slice(-rangeMap[range]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">
        Revenue Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

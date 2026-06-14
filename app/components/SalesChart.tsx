"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SalesRow = {
  category: string;
  amount: number;
};

export default function SalesChart() {
  const [data, setData] = useState<SalesRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      const { data, error } = await supabase
        .from("sales")
        .select("category, amount")
        .order("amount", { ascending: false });

      if (error) console.error(error);
      else setData(data);

      setLoading(false);
    }

    fetchSales();
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
        Sales by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="category"
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
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Sales",
            ]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

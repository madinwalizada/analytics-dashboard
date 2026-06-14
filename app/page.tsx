"use client";

import { useState } from "react";
import MetricCard from "./components/MetricCard";
import RevenueChart from "./components/RevenueChart";
import TrafficChart from "./components/TrafficChart";
import TransactionsTable from "./components/TransactionsTable";
import SalesChart from "./components/SalesChart";
import DateRangeFilter from "./components/DateRangeFilter";
import ThemeToggle from "./components/ThemeToggle";

type Range = "7d" | "30d" | "90d" | "12m";

export default function Home() {
  const [range, setRange] = useState<Range>("30d");

  const metrics = [
    {
      title: "Total Revenue",
      value: "$48,295",
      change: "+12.5%",
      positive: true,
    },
    { title: "Total Users", value: "12,847", change: "+8.2%", positive: true },
    { title: "Total Orders", value: "3,642", change: "-2.4%", positive: false },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      positive: true,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-8 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back — here is what is happening
          </p>
        </div>

        {/* Filter + toggle sit in the top right */}
        <div className="flex items-center gap-4">
          <DateRangeFilter selected={range} onChange={setRange} />
          <ThemeToggle />
        </div>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
      {/* Charts row */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <RevenueChart range={range} />
        </div>
        <div className="col-span-1">
          <TrafficChart />
        </div>
      </div>
      {/* Sales bar chart */}
      <div className="mb-8">
        <SalesChart range={range} />
      </div>
      {/* Transactions */}
      <TransactionsTable range={range} />
    </main>
  );
}

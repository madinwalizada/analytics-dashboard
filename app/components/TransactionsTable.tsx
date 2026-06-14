"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Transaction = {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

const statusStyles = {
  Completed:
    "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  Pending: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300",
  Failed: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
};

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    async function fetchTransactions() {
      const { data, error } = await supabase
        .from("transactions")
        .select()
        .order("date", { ascending: false });

      if (error) console.error(error);
      else setTransactions(data);

      setLoading(false);
    }

    fetchTransactions();
  }, []);

  if (loading)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-gray-400 text-sm">Loading transactions...</p>
      </div>
    );

  const filtered = transactions
    .filter((t) => t.customer.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (statusFilter === "All" ? true : t.status === statusFilter));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Table Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </h2>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white
                       placeholder-gray-400 dark:placeholder-gray-500
                       rounded-lg px-3 py-2 text-sm outline-none 
                       focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 dark:border-gray-600 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white
                       rounded-lg px-3 py-2 text-sm outline-none 
                       focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                ID
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                Customer
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                Date
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {transaction.customer}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  ${transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      statusStyles[transaction.status]
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}

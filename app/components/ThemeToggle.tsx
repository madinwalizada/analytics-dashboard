"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-1.5 rounded-lg text-sm font-medium border 
                 border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-800 
                 text-gray-600 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

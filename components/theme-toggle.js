
// import  {MoonIcon , SunIcon} from "@/icons";
"use client"

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
      title="Toggle Theme"
    >
      {isDark ? <> ☀️</> : <> 🌙</>}
    </button>
  );
}

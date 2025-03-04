"use client";

import { useTheme } from "next-themes";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-100 p-1 dark:bg-gray-800/50`}
      >
        <div
          onClick={() => setTheme("light")}
          className={`flex items-center justify-center rounded-md bg-white p-2 dark:bg-transparent`}
        >
          <MdOutlineLightMode className="text-lg" />
        </div>
        <div
          onClick={() => setTheme("dark")}
          className={`flex items-center justify-center rounded-md bg-transparent p-2 dark:bg-gray-700/50`}
        >
          <MdOutlineDarkMode className="text-lg" />
        </div>
      </div>
    </div>
  );
}

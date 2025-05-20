import React, { useEffect, useState } from "react";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 border rounded-md text-sm dark:border-yellow-600 border-gray-500"
    >
      {darkMode ? "🔆" : "🌒"}
    </button>
  );
};

export default DarkModeButton;

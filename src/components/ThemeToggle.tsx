import { useEffect, useState } from "react";
import sunIcon from "@/assets/sun-icon.png";
import moonIcon from "@/assets/moon-icon.png";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const icon = theme === "light" ? moonIcon : sunIcon;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full w-12 h-12 grid place-items-center bg-transparent border-0 outline-none"
      style={{ background: "transparent" }}
    >
      {/* Light mode render (darken on white bg) */}
      <img
        src={icon}
        alt={theme === "light" ? "Dark mode" : "Light mode"}
        className="w-7 h-7 dark:hidden"
        style={{ mixBlendMode: 'darken' }}
      />
      {/* Dark mode render (invert + lighten) */}
      <img
        src={icon}
        alt={theme === "light" ? "Dark mode" : "Light mode"}
        className="w-7 h-7 hidden dark:block invert"
        style={{ mixBlendMode: 'lighten' }}
      />
    </button>
  );
};

import { Button } from "@/components/ui/button";
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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-muted/30 transition-all duration-300 relative w-12 h-12"
      aria-label="Toggle theme"
    >
      <img
        src={theme === "light" ? moonIcon : sunIcon}
        alt={theme === "light" ? "Dark mode" : "Light mode"}
        className="w-7 h-7 transition-transform duration-300"
        style={{
          mixBlendMode: theme === "dark" ? "screen" : "multiply",
          filter: theme === "dark" ? "invert(1)" : "none"
        }}
      />
    </Button>
  );
};

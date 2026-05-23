"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

const COLOR_THEMES = [
  { id: "green", label: "Green", dot: "#9fcc3e" },
  { id: "blue", label: "Blue", dot: "#4d9fff" },
  { id: "orange", label: "Orange", dot: "#e8853d" },
  { id: "purple", label: "Purple", dot: "#a87be0" },
  { id: "red", label: "Red", dot: "#e04848" },
  { id: "gold", label: "Gold", dot: "#d4a54a" },
] as const;

type ColorTheme = (typeof COLOR_THEMES)[number]["id"];
type Mode = "dark" | "light";

export function ThemeToggle({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("dark");
  const [color, setColor] = useState<ColorTheme>("green");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("wz-mode") as Mode | null;
    const storedColor = localStorage.getItem("wz-color") as ColorTheme | null;
    if (storedMode) {
      setMode(storedMode);
      document.documentElement.setAttribute("data-mode", storedMode);
    }
    if (storedColor) {
      setColor(storedColor);
      document.documentElement.setAttribute("data-color", storedColor);
    }
  }, []);

  const toggleMode = useCallback(() => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.setAttribute("data-mode", next);
    localStorage.setItem("wz-mode", next);
  }, [mode]);

  const setColorTheme = useCallback((c: ColorTheme) => {
    setColor(c);
    document.documentElement.setAttribute("data-color", c);
    localStorage.setItem("wz-color", c);
    setOpen(false);
  }, []);

  return (
    <div className={cn("relative flex items-center gap-2", className)}>
      {/* Color palette toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change color theme"
        className="glass-panel inline-flex items-center justify-center rounded-full p-2 text-white/70 transition-all duration-300 hover:border-brand hover:text-brand"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2v-.5c0-.4-.2-.8-.5-1-.3-.3-.5-.7-.5-1a2 2 0 0 1 2-2h1.5A5.5 5.5 0 0 0 22 10 10 10 0 0 0 12 2z" />
          <circle cx="7" cy="10" r="1.5" fill="currentColor" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="17" cy="10" r="1.5" fill="currentColor" />
          <circle cx="9" cy="15" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Color dots dropdown */}
      {open && (
        <div className="glass-card absolute right-0 top-full z-50 mt-2 flex gap-2 rounded-xl p-3">
          {COLOR_THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setColorTheme(theme.id)}
              aria-label={`${theme.label} theme`}
              className={cn(
                "h-6 w-6 rounded-full border-2 transition-all duration-200 hover:scale-110",
                color === theme.id
                  ? "border-white scale-110 shadow-[0_0_10px_currentColor]"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
              style={{ backgroundColor: theme.dot, color: theme.dot }}
            />
          ))}
        </div>
      )}

      {/* Light/Dark mode toggle */}
      <button
        type="button"
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        className="glass-panel inline-flex items-center justify-center rounded-full p-2 text-white/70 transition-all duration-300 hover:border-brand hover:text-brand"
      >
        {mode === "dark" ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}

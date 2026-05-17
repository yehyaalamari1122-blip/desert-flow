import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type Direction = "ltr" | "rtl";

interface AppShellContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  dir: Direction;
  setDir: (d: Direction) => void;
  toggleDir: () => void;
}

const AppShellContext = createContext<AppShellContextValue | null>(null);

export function AppShellProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [dir, setDirState] = useState<Direction>("rtl");

  // Hydrate from localStorage / system preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = (localStorage.getItem("nexa-theme") as Theme | null) ?? null;
    const savedDir = (localStorage.getItem("nexa-dir") as Direction | null) ?? null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeState(savedTheme ?? (prefersDark ? "dark" : "light"));
    setDirState(savedDir ?? "rtl");
  }, []);

  // Apply theme class + dir attribute
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("nexa-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    localStorage.setItem("nexa-dir", dir);
  }, [dir]);

  const value: AppShellContextValue = {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    dir,
    setDir: setDirState,
    toggleDir: () => setDirState((d) => (d === "ltr" ? "rtl" : "ltr")),
  };

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>;
}

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error("useAppShell must be used inside AppShellProvider");
  return ctx;
}

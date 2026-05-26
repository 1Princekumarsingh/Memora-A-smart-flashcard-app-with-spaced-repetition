import { create } from "zustand";

const applyTheme = (theme) => {
    const root = document.documentElement;

    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
};

const getInitialTheme = () => {
    return localStorage.getItem("theme") || "light";
};

const useTheme = create((set, get) => ({
    theme: getInitialTheme(),

    initializeTheme: () => {
        const theme = get().theme;
        applyTheme(theme);
    },

    toggleTheme: () => {
        const nextTheme = get().theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);

        set({
            theme: nextTheme,
        });
    },
    
    setTheme: (theme) => {
        applyTheme(theme);
        set({
            theme,
        });
    },
}));

export default useTheme;

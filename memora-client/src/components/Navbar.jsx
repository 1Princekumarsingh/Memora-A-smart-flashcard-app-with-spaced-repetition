import { NavLink } from "react-router-dom";
import useTheme from "../utils/useTheme";

const Navbar = () => {
  const baseStyle = "px-3 py-1 rounded";
  const activeStyle = "bg-blue-500 text-white";

  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);

  return (
    <nav className="flex gap-4 border-b border-gray-200 bg-gray-100 p-4 dark:border-slate-800 dark:bg-slate-900">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive
              ? activeStyle
              : "text-gray-700 hover:bg-gray-200 dark:text-slate-200 dark:hover:bg-slate-800"
          }`
        }>
        Home
      </NavLink>

      <NavLink
        to="/stats"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive
              ? activeStyle
              : "text-gray-700 hover:bg-gray-200 dark:text-slate-200 dark:hover:bg-slate-800"
          }`
        }>
        Stats
      </NavLink>

      <button
        type="button"
        onClick={toggleTheme}
        className="ml-auto rounded px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </nav>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseStyle = "px-3 py-1 rounded";
  const activeStyle = "bg-blue-500 text-white";

  return (
    <nav className="p-4 flex gap-4 bg-gray-100">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/stats"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Stats
      </NavLink>
    </nav>
  );
};

export default Navbar;
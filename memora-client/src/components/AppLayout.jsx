import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ToastContainer from "./ToastContainer";
import useTheme from "../utils/useTheme";
import { useEffect } from "react";

export default function AppLayout() {
  const initializeTheme = useTheme((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />

      <main className="p-4">
        <Outlet />
      </main>
      
      <ToastContainer/>
    </div>
  );
}

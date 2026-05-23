import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import ToastContainer from "./ToastContainer";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
      <ToastContainer/>
    </div>
  );
}
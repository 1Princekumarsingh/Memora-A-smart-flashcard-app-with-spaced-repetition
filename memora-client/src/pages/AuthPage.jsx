import LoginForm from "../features/auth/components/LoginForm";
import SignupForm from "../features/auth/components/SignupForm";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "../utils/useTheme";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const token = useAuthStore((s) => s.token);
  const initializeTheme = useTheme((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  if (token) return <Navigate to="/" replace/>

  return(
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {mode === "login"? <LoginForm/> : <SignupForm/>}

      <button
      onClick={() => setMode(mode === "login" ? "signup" : "login")}
      className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        {mode === "login"? "Don't have an account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  )
}

import LoginForm from "../features/auth/components/LoginForm";
import SignupForm from "../features/auth/components/SignupForm";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const token = useAuthStore((s)=> s.token);

  if (token) return <Navigate to="/" replace/>

  return(
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {mode === "login"? <LoginForm/> : <SignupForm/>}

      <button
      onClick={() => setMode(mode === "login" ? "signup" : "login")}
      className="mt-4 text-blue-600">
        {mode === "login"? "Don't have an account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  )
}
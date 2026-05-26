import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { loginSchema } from "../../../lib/schemas/auth"
import useAuthStore from "../../../store/authStore"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

  const{
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm({ resolver: zodResolver(loginSchema)})

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    // to simulate api delay
    await new Promise((res) => setTimeout(res, 1000));
    // reset();

    login({ // store token
      token: "fake-jwt-token",
      user: { email: data.email },
    }); 

    navigate("/"); // redirect
  }

  return(
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Welcome Back
        </h2>

        {/* email */}
        <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" {...register("email")}
            className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"/>
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                </p>
            )}
        </div>

        {/* password */}
        <div className="mb-4">
            <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" {...register("password")} className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"/>
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                </p>
            )}
        </div>

        {/* button */}
        <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
            {isSubmitting? "Signing in..." : "Sign In"}
        </button>
    </form>
  )
}

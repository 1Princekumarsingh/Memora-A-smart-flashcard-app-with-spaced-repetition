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
    formState: {errors, isSubmitting},
    reset
  } = useForm({ resolver: zodResolver(loginSchema)})

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    // simulate API delay
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
    className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">
            Welcome Back
        </h2>

        {/* email */}
        <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input type="email" {...register("email")}
            className="w-full p-2 border rounded-md"/>
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                </p>
            )}
        </div>

        {/* password */}
        <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input type="password" {...register("password")} className="w-full p-2 border rounded-md"/>
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

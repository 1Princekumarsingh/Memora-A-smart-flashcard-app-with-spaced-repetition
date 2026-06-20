import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../lib/schemas/auth";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const {
        register, 
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = async(data) =>{
        console.log("Signup data:", data);
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          });

          const resData = await response.json();

          if (!response.ok) {
            throw new Error(resData.message || "Failed to sign up");
          }

          login({
            token: resData.data.token,
            user: resData.data.user,
          });

          navigate("/"); // redirect
        } catch (err) {
          setError("root", { type: "manual", message: err.message });
        }
    }
    return(
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-4 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
                create Account
            </h2>

            {errors.root && (
                <p className="text-red-500 text-sm mb-4 text-center font-medium">
                    {errors.root.message}
                </p>
            )}

            <div className="mb-4">
                <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" {...register("email")} className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"/>
                {errors.email &&
                <p className="text-red-500 text-sm">{errors.email.message}</p> }
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">Password</label>
                <input type="password" {...register("password")} className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"/>
                {errors.password &&
                <p className="text-red-500 text-sm">{errors.password.message}</p> }
            </div>

            <div className="mb-4">
                <label className="mb-1 block text-sm text-slate-700 dark:text-slate-300">Confirm Password</label>
                <input type="password" {...register("confirmPassword")} className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"/>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-2 rounded-md">
                {isSubmitting? "Creating..." : "Sign Up"}
            </button>
        </form>
    )
}

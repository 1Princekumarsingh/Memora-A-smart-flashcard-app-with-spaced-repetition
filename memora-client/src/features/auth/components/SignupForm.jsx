import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../../lib/schemas/auth";
import useAuthStore from "../../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const{
        register, 
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = async(data) =>{
        await new Promise((res) => setTimeout(res, 1000));
        login({
            token: "fake-tokenn",
            user: {email:data.email}
        });
        navigate("/")
    }
    return(
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">
            <h2 className="mb-4 text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">
                create Account
            </h2>

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

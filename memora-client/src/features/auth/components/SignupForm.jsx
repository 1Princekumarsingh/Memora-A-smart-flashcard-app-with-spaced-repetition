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
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                create Account
            </h2>

            <div className="mb-4">
                <label>Email</label>
                <input type="email" {...register("email")} className="w-full p-2 border rounded-md"/>
                {errors.email &&
                <p className="text-red-500 text-sm">{errors.email.message}</p> }
            </div>

            <div className="mb-4">
                <label>Password</label>
                <input type="password" {...register("password")} className="w-full p-2 border rounded-md"/>
                {errors.password &&
                <p className="text-red-500 text-sm">{errors.password.message}</p> }
            </div>

            <div className="mb-4">
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword")} className="w-full p-2 border rounded-md"/>
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

import useToastStore from "../store/toastStore";
import { AnimatePresence, motion } from "framer-motion";

const toastStyles = {
  success: "border-green-300 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  error: "border-red-300 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
  info: "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
};

export default function ToastContainer(){
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast)

    return(
        <div className="fixed right-4 top-4 z-50 space-y-3">
            <AnimatePresence>
                {toasts.map((toast)=> (
                    <motion.div key={toast.id} 
                    initial = {{opacity:0, x:50}}
                    animate= {{opacity: 1, x:0}}
                    exit={{opacity:0, x:50}}
                    transition={{duration: 0.2}}
                    className={`flex items-center gap-3 rounded-md border px-4 py-3 shadow-md ${toastStyles[toast.type]}`}> 
                    <span>{toast.message}</span>
                    <button type="button" onClick={()=> removeToast(toast.id)} className="font-bold">
                        x
                    </button>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    )
}

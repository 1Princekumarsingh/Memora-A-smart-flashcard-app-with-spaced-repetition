import useToastStore from "../store/toastStore";

const toastStyles = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

export default function ToastContainer(){
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast)

    return(
        <div className="fixed right-4 top-4 z-50 space-y-3">
            {toasts.map((toast)=> (
                <div key={toast.id} className={`flex items-center gap-3 rounded-md border px-4 py-3 shadow-md ${toastStyles[toast.type]}`}> 
                    <span>{toast.message}</span>
                    <button type="button" onClick={()=> removeToast(toast.id)} className="font-bold">
                        x
                    </button>
                </div>
            ))}
        </div>
    )
}
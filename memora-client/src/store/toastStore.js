import { create } from "zustand";

const useToastStore = create((set) => ({
    toasts: [],

    addToast: (message, type="info") => { //if only write type then If you call it without writing type it becomes undefined
        const id = Date.now();

        set((state)=> ({
            toasts: [...state.toasts, {id, message, type}]
        }))
        //auto removal
        setTimeout(()=>{
            set((state)=>({
                toasts: state.toasts.filter((toasts) => toasts.id !== id)
            }))
        }, 3000)
    },

    //manual removal
    removeToast: (id) =>{
        set((state)=> ({
            toasts: state.toasts.filter((toasts)=> toasts.id !== id)
        }))
    }
}))

export default useToastStore
import { create } from "zustand";

const useAuthStore = create((set)=>({
    token:"test-token",
    setToken: (token) => set({token}),
    logout: () => set({token: null}) 
}))

export default useAuthStore
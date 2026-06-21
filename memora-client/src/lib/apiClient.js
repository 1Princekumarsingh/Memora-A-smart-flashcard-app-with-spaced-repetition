import useAuthStore from "../store/authStore";

export async function apiFetch(url, options = {}){
    const token = useAuthStore.getState().token;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    }

    if(token){
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(url, {...options, headers});
    return response;
}

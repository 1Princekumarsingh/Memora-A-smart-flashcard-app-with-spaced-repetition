import useAuthStore from "../store/authStore";

export async function apiFetch(url, options = {}){
    const accessToken = useAuthStore.getState().accessToken;

    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    }

    if(accessToken){
        headers.Authorization = `Bearer ${accessToken}`
    }

    const response = await fetch(url, {...options, headers});
    return response;
}

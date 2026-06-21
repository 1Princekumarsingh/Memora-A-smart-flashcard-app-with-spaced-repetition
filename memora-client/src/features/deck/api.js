import { apiFetch } from "../../lib/apiClient";

const API_URL = "http://localhost:5000/api/decks";

export async function getDecks(){
    const response = await apiFetch(API_URL);

    if(!response.ok){
        throw new Error("Failed to fetch decks");
    }

    const result = await response.json();
    return result.data;
}

export async function createDeck(payload){
    const response = await apiFetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok){
        throw new Error("Failed to create deck");
    }

    const result = await response.json();
    return result.data;
}

export async function deleteDeck(id) {
    const response = await apiFetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if(!response.ok){
        throw new Error("Failed to delete deck");
    }
    return response.json();
}
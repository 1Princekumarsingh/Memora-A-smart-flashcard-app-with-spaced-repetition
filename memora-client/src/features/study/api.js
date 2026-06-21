import { apiFetch } from "../../lib/apiClient";

const API_reviews = "http://localhost:5000/api/reviews";
const API_decks = "http://localhost:5000/api/decks";

export async function submitReview(payload) {
    const response = await apiFetch(API_reviews, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json();

    return result.data;
}

export async function getStudyCards(deckId) {
    const response = await apiFetch(`${API_decks}/${deckId}/study`);

    if(!response.ok){
        throw new Error("Failed to fetch study cards");
    }

    const result = await response.json();
    return result.data;
}
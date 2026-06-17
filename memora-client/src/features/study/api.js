const API = "http://localhost:5000/api/reviews";

export async function submitReview(payload) {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const result = await response.json();

    return result.data;
}
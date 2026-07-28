import request from "supertest";
import app from "../app.js";

export async function createDeck(token, overrides = {}){
    const response =  await request(app)
    .post("/api/decks").
    set("Authorization", `Bearer ${token}`)
    .send({
        name: "React",
        ...overrides
    })

    return response.body.data;
}

export async function createCard(token, deckId, overrides = {}) {
    const response = await request(app)
    .post(`/api/decks/${deckId}/cards`)
    .set("Authorization", `Bearer ${token}`)
    .send({
        question: "What is React?",
        answer: "A UI library",
        deckId,
        ...overrides
    })

    return response.body.data;
}

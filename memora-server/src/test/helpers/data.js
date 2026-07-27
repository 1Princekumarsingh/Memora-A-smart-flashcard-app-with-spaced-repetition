import request from "supertest";
import app from "../../app.js";

export const createDeck = async (token, overrides = {}) => {
    const response = await request(app)
        .post("/api/decks")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
            name: "React",
            ...overrides
        })

    return response.body.data;
};

export const createCard = async (token, deckId, overrides = {}) =>{
  const response = await request(app)
    .post(`/api/decks/${deckId}/cards`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      question: "What is React?",
      answer: "A UI library",
      deckId,
      ...overrides,
    })

    return response.body.data;
}

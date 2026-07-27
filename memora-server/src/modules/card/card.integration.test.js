import request from "supertest";
import { expect, it, describe } from "vitest";

import app from "../../app.js";
import { loginUser } from "../../test/helpers/auth.js";
import { createDeck, createCard } from "../../test/helpers/data.js";

describe("card integration", () => {
    it("should create card", async () => {
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)

        const response = await request(app)
        .post(`/api/decks/${deck.id}/cards`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            question: "What is your name?",
            answer: "Prince",
            deckId: deck.id,
        })

        expect(response.status).toBe(201);
        expect(response.body.data.question).toBe("What is your name?");
        expect(response.body.data.deckId).toBe(deck.id);
    })

    it("should get cards", async () => {
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)

        await createCard(accessToken, deck.id, {
        question: "What is JSX?",
        answer: "JavaScript XML",
        })

        const response = await request(app)
        .get(`/api/decks/${deck.id}/cards`)
        .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveLength(1)
        expect(response.body.data[0].question).toBe("What is JSX?")
    })

    it("should delete card", async () => {
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)
        const card = await createCard(accessToken, deck.id);


        const response = await request(app)
        .delete(`/api/cards/${card.id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        
        expect(response.status).toBe(200);

        const cards = await request(app)
        .get(`/api/decks/${deck.id}/cards`)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(cards.body.data).toHaveLength(0);
    })

    it("it should return 404 for invalid card", async () => {
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)
        await createCard(accessToken, deck.id)
        
        const response = await request(app)
        .delete("/api/cards/invalid-card-id")
        .set("Authorization", `Bearer ${accessToken}`)
        
        expect(response.status).toBe(404);
    })
})

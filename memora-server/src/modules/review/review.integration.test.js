import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app.js";
import { prisma } from "../../config/prisma.js";
import { loginUser } from "../../test/helpers/auth.js";
import { createDeck, createCard } from "../../test/helpers/data.js";

describe("review integration", () => {
    it("should create review and update card nextReview", async () => {
        const { accessToken } = await loginUser()
        const deck = await createDeck(accessToken)
        const card = await createCard(accessToken, deck.id)

        const response = await request(app)
        .post("/api/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            cardId: card.id,
            rating: 4
        })

        expect(response.status).toBe(201);
        expect(response.body.data.cardId).toBe(card.id)
        expect(response.body.data.rating).toBe(4)

        const review = await prisma.review.findFirst({
            where:{
                cardId: card.id
            }
        })

        const updateCard = await prisma.card.findUnique({
            where:{
                id: card.id
            }
        })

        expect(review).not.toBeNull();
        expect(updateCard.nextReview).not.toBeNull();
    })

    it("should exclude non due cards study endpoint after review", async () => {
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)
        const card = await createCard(accessToken, deck.id)

        await request(app)
        .post("/api/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            cardId: card.id,
            rating: 4
        })
        
        const response = await request(app)
        .get(`/api/decks/${deck.id}/study`)
        .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toEqual([]);
    })

    it("should reject invalid review body", async () => {
        const { accessToken } = await loginUser()
        
        const response = await request(app)
        .post("/api/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          cardId: "",
          rating: 9,
        })
        
        expect(response.status).toBe(400);
    })
})

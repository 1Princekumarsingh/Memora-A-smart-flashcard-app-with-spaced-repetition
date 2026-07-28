import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../app.js";
import { prisma } from "../../config/prisma.js";
import { loginUser } from "../../test/helpers/auth.js";
import { createCard, createDeck } from "../../test/helpers/data.js";

describe("stats integration", () => {
    it("should calculate review", async () => {
        const { accessToken } = await loginUser()
        const deck = await createDeck(accessToken)

        const cardA = await createCard(accessToken, deck.id, {
            question: "A",
            answer: " Answer A"
        })

        const cardB = await createCard(accessToken, deck.id, {
            question: "A",
            answer: "Answer B"
        })

        await request(app)
        .post("/api/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            cardId: cardA.id,
            rating: 4
        })

        await request(app)
        .post("/api/reviews")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
            cardId: cardB.id,
            rating: 1
        })

        const response = await request(app)
        .get("/api/stats")
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200);
        expect(response.body.data.totalReviews).toBe(2);
        expect(response.body.data.weakCount).toBe(1);
        expect(response.body.data.strongCount).toBe(1);
        expect(response.body.data.retentionRate).toBe(50);
    })

    it("should return heatmap", async () => {
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
        .get("/api/stats/heatmap")
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
        expect(response.body.data.some((day) => day.count > 0)).toBe(true)
    })
})

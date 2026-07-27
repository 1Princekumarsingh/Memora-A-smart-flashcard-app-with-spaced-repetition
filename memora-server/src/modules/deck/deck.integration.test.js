import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app.js";

import { loginUser } from "../../test/helpers/auth.js";
import { createDeck } from "../../test/helpers/data.js";

describe("deck integration", ()=> {
    it("should create deck", async () => {
        const { accessToken } = await loginUser()
        
        const response = await request(app)
        .post("/api/decks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({name: " React"})
        
        expect(response.status).toBe(201);
        expect(response.body.data.name).toBe("React");
    })

    it("should get decks", async () => {
    const { accessToken } = await loginUser();
    await createDeck(accessToken, { name: "React" })

    const response = await request(app)
      .get("/api/decks")
      .set("Authorization", `Bearer ${accessToken}`)

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].name).toBe("React");

    })

    it("should get single deck", async () => {
        const {accessToken} = await loginUser();
        const deck = await createDeck(accessToken, {name: "React"})

        const response = await request(app)
        .get(`/api/decks/${deck.id}`)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.data.id).toBe(deck.id)

        const decks = await request(app)
        .get("/api/decks")
        .set("Authorization", `Bearer ${accessToken}`)

        expect(decks.body.data).toHaveLength(1)
    })

    it("should delete deck", async () =>{
        const {accessToken} = await loginUser()
        const deck = await createDeck(accessToken)
        
        const response = await request(app)
        .delete(`/api/decks/${deck.id}`)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200)

        const decks = await request(app)
        .get("/api/decks")
        .set("Authorization", `Bearer ${accessToken}`)

        expect(decks.body.data).toHaveLength(0);
    })

    it("should reject unauthorized request", async () =>{
        const response = await request(app).get("/api/decks");

        expect(response.status).toBe(401);
    })

    it("should prevent user from accessing another user's deck", async () => {
        const userA = await loginUser({
            email: "prince@gmail.com",
            password: "pass@123"
        })

        const userB = await loginUser({
            email: "test@gmail.com",
            password: "pass@234"
        })
        
        const deck = await createDeck(userA.accessToken);

        const response = await request(app)
        .get(`/api/decks/${deck.id}`)
        .set("Authorization", `Bearer ${userB.accessToken}`);


        expect(response.status).toBe(404);
    })
})

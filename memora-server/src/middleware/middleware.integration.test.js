import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app.js";
import { loginUser } from "../test/helpers/auth.js";

describe("middleware integration", () => {
    it("should reject request with no JWT", async () => {
        const response = await request(app).get("/api/decks")

        expect(response.status).toBe(401);
    })

    it("should reject request with invalid JWT", async () => {
      const response = await request(app)
        .get("/api/decks")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
    })

    it("should reject malformed JSON", async () => {
        const response = await request(app)
        .post("/api/auth/signup")
        .set("content-Type","application/json")
        .send('{"email":"bad@test.com","password":')

        expect(response.status).toBe(400);
    })

    it("should reject invalid zod body", async () => {
        const response = await request(app)
        .post("/api/auth/signup")
        .send({
            email:"not-an-email",
            password: "123"
        })

        expect(response.status).toBe(400);
    })

    it("should rate limit repeated login attempts", async () => {
        await loginUser({
            email: "limit@gmail.com",
            password: "pass@123"
        })

        process.env.ENABLE_RATE_LIMIT_TESTS = "true";
        let lastResponse;

        try {
            for (let i=0; i<20; i+=1){
                lastResponse = await request(app)
                .post("/api/auth/login").
                send({
                    email: "limit@gmail.com",
                    password: "wrong-password",
                })
            }
        } finally {
            delete process.env.ENABLE_RATE_LIMIT_TESTS;
        }

        expect(lastResponse.status).toBe(429);
    })
})

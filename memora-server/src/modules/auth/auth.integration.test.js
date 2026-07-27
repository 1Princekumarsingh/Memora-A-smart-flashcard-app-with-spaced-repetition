import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../app.js";

describe("auth integration", () => {
    it("should signup successfully", async () => {
        const response = await request(app).post("/api/auth/signup")
        .send({
            email: "prince@gmail.com",
            password: "pass@123"
        })

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");
        expect(response.body.data.user.email).toBe("prince@gmail.com");
        expect(response.body.data.user).not.toHaveProperty("passwordHash");
    })

    it("should reject duplicate email", async() => {
    await request(app).post("/api/auth/signup").send({
      email: "prince@gmail.com",
      password: "pass@123",
    })

    const response = await request(app).post("/api/auth/signup").send({
      email: "prince@gmail.com",
      password: "pass@123",
    })

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
    })

    it("should login successfully", async () => {
    await request(app).post("/api/auth/signup").send({
      email: "prince@gmail.com",
      password: "pass@123",
    })

    const response = await request(app).post("/api/auth/login").send({
        email: "prince@gmail.com",
        password: "pass@123"
    })

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("accessToken");
    expect(response.body.data).toHaveProperty("refreshToken");
    })

    it("should reject wrong password", async() => {
    await request(app).post("/api/auth/signup").send({
      email: "prince@gmail.com",
      password: "pass@123",
    })

    const response = await request(app).post("/api/auth/login").send({
      email: "prince@gmail.com",
      password: "pass@3242",
    })

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    })

    it("should refresh token successfully", async () => {
        const signup = await request(app).post("/api/auth/signup").send({
            email: "prince@gmail.com",
            password: "pass@123"
        })

        const response = await request(app).post("/api/auth/refresh").send({
            refreshToken: signup.body.data.refreshToken
        })

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("accessToken");
        expect(response.body.data).toHaveProperty("refreshToken");
        expect(response.body.data.refreshToken).not.toBe(signup.body.data.refreshToken);
    })

    it("should logout successfully", async () => {
        const signup = await request(app).post("/api/auth/signup").send({
            email: "prince@gmail.com",
            password: "pass@123"
        })

        const response = await request(app).post("/api/auth/logout").send({
            refreshToken: signup.body.data.refreshToken
        })
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    })

    it("should reject refresh after logout", async () => {
        const signup = await request(app).post("/api/auth/signup").send({
            email: "prince@gmail.com",
            password: "pass@123"
        })

        await request(app).post("/api/auth/logout").send({
            refreshToken: signup.body.data.refreshToken
        })
        
        const response = await request(app).post("/api/auth/refresh").send({
            refreshToken: signup.body.data.refreshToken
        })

        expect(response.status).toBe(401)
    })
})

import request from "supertest";
import app from "../app.js";

export async function signupUser(overrides = {}){
    const user = {
    email: "test@example.com",
    password: "password123",
    ...overrides,
    }

    return request(app).post("/api/auth/signup").send(user);
}

export async function loginUser(overrides = {}){
    const user = {
    email: "test@example.com",
    password: "password123",
    ...overrides,
    }

    await signupUser(user)

    const response = await request(app).post("/api/auth/login").send(user)

    return {
        accessToken: response.body.data.accessToken,
        refreshToken: response.body.data.refreshToken,
        user: response.body.data.user
    }
}

export async function authHeader(overrides = {}){
    
    const { accessToken } = await loginUser(overrides)
    
    return{
        Authorization: `Bearer ${accessToken}`
    }
}

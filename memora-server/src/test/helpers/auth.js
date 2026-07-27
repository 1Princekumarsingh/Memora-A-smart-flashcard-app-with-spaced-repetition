import request from "supertest";
import app from "../../app.js";

export const loginUser = async ({
    email = "prince@gmail.com",
    password = "pass@123",
} = {}) => {
    const response = await request(app)
        .post("/api/auth/signup")
        .send({ email, password });

    return response.body.data;
};

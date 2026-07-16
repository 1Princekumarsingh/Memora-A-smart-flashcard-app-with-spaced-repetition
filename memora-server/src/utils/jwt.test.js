import {describe, expect, it} from "vitest";
import {signAccessToken, verifyAccessToken} from "./jwt.js";

describe("JWT", () => {
    it("create a valid access token", () => {

        const token = signAccessToken({
            id: "user123"
        });

        expect(token).toBeTypeOf("string")
    })

    it ("verifies token", () => {
        const token = signAccessToken({
            id: "user123"
        })

        const payload = verifyAccessToken(token);

        expect(payload.id).toBe("user123")

    })
})


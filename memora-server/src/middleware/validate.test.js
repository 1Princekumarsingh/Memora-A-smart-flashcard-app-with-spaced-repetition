import { z } from "zod";
import { describe, expect, it, vi } from "vitest";
import { AppError } from "../utils/AppError.js";
import { validate } from "./validate.js";

describe("validate middleware", () => {
    const schema = z.object({
        name: z.string().min(1)
    });

    it("calls next when the request body is valid", async () => {
        const req = {
            body: {
                name: "React"
            }
        };
        const res = {};
        const next = vi.fn();

        await validate(schema)(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it("calls next with AppError when the request body is invalid", async () => {
        const req = {
            body: {}
        };
        const res = {};
        const next = vi.fn();

        await validate(schema)(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
});
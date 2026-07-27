import { beforeEach, describe, it, expect, vi } from "vitest";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { signup } from "./auth.service.js";

vi.mock("../../config/prisma.js", () => ({
    prisma: {
        user: {
            findUnique: vi.fn(),
            create: vi.fn()
        },
        refreshToken: {
            create: vi.fn()
        }
    }
}))

vi.mock("bcryptjs", () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn()
    }
}))

vi.mock("../../utils/jwt.js", () => ({
    signAccessToken: vi.fn(),
    signRefreshToken: vi.fn(),
    verifyAccessToken: vi.fn(),
    verifyRefreshToken: vi.fn()
}))

describe ("auth.service signup", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("throws AppError when the user already exists", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: "user-1",
            email: "abc@gmail.com"
        })

        await expect(
            signup({
                email: "abc@gmail.com",
                password: "pass_123"
            })
        ).rejects.toBeInstanceOf(AppError)

        expect(prisma.user.create).not.toHaveBeenCalled()
    });

    it("hashes password, creates user, stores refresh token and returns tokens", async() => {

        const user = {
            id: "user-1",
            email: "abc@gmail.com",
            passwordHash: "hashed-password"
        }

        prisma.user.findUnique.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("hashed-password");
        prisma.user.create.mockResolvedValue(user);
        signAccessToken.mockReturnValue("access-token");
        signRefreshToken.mockReturnValue("refresh-token");
        prisma.refreshToken.create.mockResolvedValue({});

        const result = await signup({
            email: "abc@gmail.com",
            password: "pass_123"
        })

        expect(bcrypt.hash).toHaveBeenCalledWith("pass_123", 12);

        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
                email: "abc@gmail.com",
                passwordHash: "hashed-password"
            }
        })

        expect(prisma.refreshToken.create).toHaveBeenCalledWith({
            data: {
                token: "refresh-token",
                userId: "user-1",
                expiresAt: expect.any(Date)
            }
        })

        expect(result).toEqual({
            accessToken: "access-token",
            refreshToken: "refresh-token",
            user: {
                id: "user-1",
                email: "abc@gmail.com"
            }
        })
    })
})
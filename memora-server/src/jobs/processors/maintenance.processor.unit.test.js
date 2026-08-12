import { beforeEach, describe, it, expect, vi } from "vitest";
import { prisma } from "../../config/prisma.js";
import { cleanupExpiredRefreshTokens, dailySystemReport, processMaintenanceJob } from "./maintenance.processor.js";

vi.mock("../../config/prisma.js", () => ({
    prisma: {
        refreshToken: {
            deleteMany: vi.fn(),
            count: vi.fn()
        },
        user: {
            count: vi.fn()
        },
        deck: {
            count: vi.fn()
        },
        card: {
            count: vi.fn()
        },
        review: {
            count: vi.fn()
        }
    }
}))

describe("maintenance processor", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("clean up expired refresh tokens", async () => {
        prisma.refreshToken.deleteMany.mockResolvedValue({count: 3})

        const result = await cleanupExpiredRefreshTokens()

        expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({
            where: {
                expiresAt: {
                    lt: expect.any(Date)
                }
            }
        })

        expect(result).toEqual({deleted: 3})
    })

    it("create daily system report count", async () => {
        prisma.user.count.mockResolvedValue(2)
        prisma.deck.count.mockResolvedValue(4)
        prisma.card.count.mockResolvedValueOnce(10).mockResolvedValueOnce(6)
        prisma.review.count.mockResolvedValue(20)
        prisma.refreshToken.count.mockResolvedValue(3)

        const result = await dailySystemReport()

        expect(prisma.user.count).toHaveBeenCalled()
        expect(prisma.deck.count).toHaveBeenCalled()
        expect(prisma.review.count).toHaveBeenCalled()
        expect(prisma.refreshToken.count).toHaveBeenCalled()

        expect(prisma.card.count).toHaveBeenNthCalledWith(1)
        expect(prisma.card.count).toHaveBeenNthCalledWith(2,{
            where: {
                OR: [
                    { nextReview: null },
                    { nextReview: { lte: expect.any(Date) }}
                ]
            }
        })

        expect(result).toEqual({
            userCount: 2,
            deckCount: 4,
            cardCount: 10,
            reviewCount: 20,
            dueCardCount: 6,
            refreshTokenCount: 3
        })
    })

    it("routes cleanup-expired-refresh-tokens jobs", async () => {
        prisma.refreshToken.deleteMany.mockResolvedValue({count: 1})

        const result = await processMaintenanceJob({
            name: "cleanup-expired-refresh-tokens"
        })

        expect(result).toEqual({deleted: 1})
    })

    it("routes daily-system-report jobs", async () => {
        prisma.user.count.mockResolvedValue(2)
        prisma.deck.count.mockResolvedValue(4)
        prisma.card.count.mockResolvedValueOnce(10).mockResolvedValueOnce(6)
        prisma.review.count.mockResolvedValue(20)
        prisma.refreshToken.count.mockResolvedValue(3)

        const result  = await processMaintenanceJob({
            name: "daily-system-report"
        })

        expect(result).toEqual({
            userCount: 2,
            deckCount: 4,
            cardCount: 10,
            reviewCount: 20,
            dueCardCount: 6,
            refreshTokenCount: 3
        })
    })

    it("throws for unknown maintainance jobs", async () => {
        await expect(processMaintenanceJob({ name: "unknown-job" }))
        .rejects.toThrow("Unknown maintenance job: unknown-job")
    })
})
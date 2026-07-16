import { beforeEach, describe, it, expect, vi } from "vitest";
import { prisma } from "../../config/prisma.js";
import { deleteCache } from "../../utils/cache.js";
import { getNextReviewDate } from "../../utils/spacedRepetition.js";
import { submitReview } from "./review.service.js";

vi.mock("../../config/prisma.js", () => ({
    prisma: {
        review: {
            create: vi.fn()
        },
        card: {
            update: vi.fn()
        }
    }
}))

vi.mock("../../utils/spacedRepetition.js", () => ({
    getNextReviewDate: vi.fn()
}))

vi.mock("../../utils/cache.js", () => ({
    deleteCache: vi.fn()
}))

describe("review.service submitReview", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("create review, updates cards and deletes study and study caches", async () => {
        const nextReview = new Date("2026-07-17T00:00:00.000Z");
        const review = {
            id: "review-1",
            cardId: "card-1",
            rating: 4
        }

        prisma.review.create.mockResolvedValue(review)
        getNextReviewDate.mockReturnValue(nextReview)
        prisma.card.update.mockResolvedValue({
            id: "card-1",
            deckId: "deck-1",
            deck: {
                userId: "user-1"
            }
        })

        const result = await submitReview({
            cardId: "card-1",
            rating: 4
        })

        expect(prisma.review.create).toHaveBeenCalledWith({
            data: {
                rating: 4,
                cardId: "card-1"
            }
        })

        expect(prisma.card.update).toHaveBeenCalledWith({
            where: {
                id: "card-1"
            },
            data: {
                nextReview
            },
            include: {
                deck: {
                    select: {
                        userId: true
                    }
                }
            }
        })

        expect(deleteCache).toHaveBeenCalledWith(
            "user:user-1:decks",
            "user:user-1:deck:deck-1",
            "study:deck-1",
            "user:user-1:stats",
            "user:user-1:heatmap"
        )

        expect(result).toEqual(review);
    })
})
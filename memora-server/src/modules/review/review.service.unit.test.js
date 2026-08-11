import { beforeEach, describe, it, expect, vi } from "vitest";
import { prisma } from "../../config/prisma.js";
import { deleteCache } from "../../utils/cache.js";
import { calculateSchedule } from "../../utils/spacedRepetition.js";
import { submitReview } from "./review.service.js";

vi.mock("../../config/prisma.js", () => ({
    prisma: {
        review: {
            create: vi.fn()
        },
        card: {
            findUnique: vi.fn(),
            update: vi.fn()
        }
    }
}))

vi.mock("../../utils/spacedRepetition.js", () => ({
    calculateSchedule: vi.fn()
}))

vi.mock("../../utils/cache.js", () => ({
    deleteCache: vi.fn()
}))

describe("review.service submitReview", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("create review, updates cards and invalidates related caches", async () => {
        const nextReview = new Date("2026-07-17T00:00:00.000Z");
        const schedule = {
            repetitions: 1,
            interval: 1,
            easeFactor: 2.6,
            nextReview
        }
        const review = {
            id: "review-1",
            cardId: "card-1",
            rating: 4
        }
        const card = {
            id: "card-1",
            deckId: "deck-1",
            repetitions: 0,
            interval: 0,
            easeFactor: 2.5,
            deck: {
                userId: "user-1"
            }
        }

        prisma.review.create.mockResolvedValue(review)
        prisma.card.findUnique.mockResolvedValue(card)
        calculateSchedule.mockReturnValue(schedule)
        prisma.card.update.mockResolvedValue({ ...card, ...schedule })

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

        expect(prisma.card.findUnique).toHaveBeenCalledWith({
            where: {
                id: "card-1"
            },
            include: {
                deck: {
                    select: {
                        userId: true
                    }
                }
            }
        })

        expect(calculateSchedule).toHaveBeenCalledWith(card, 4)

        expect(prisma.card.update).toHaveBeenCalledWith({
            where: {
                id: "card-1"
            },
            data: {
                repetitions: schedule.repetitions,
                interval: schedule.interval,
                easeFactor: schedule.easeFactor,
                nextReview: schedule.nextReview
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

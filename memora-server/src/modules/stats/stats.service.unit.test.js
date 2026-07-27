import { beforeEach, describe, it, expect, vi } from "vitest";
import { prisma } from "../../config/prisma.js";
import { getCache, setCache } from "../../utils/cache.js";
import { getStats } from "./stats.service.js";

vi.mock("../../config/prisma.js", ()=> ({
    prisma: {
        review: {
            findMany: vi.fn()
        },
        deck: {
            findMany: vi.fn()
        }
    }
}))

vi.mock("../../utils/cache.js", () => ({
    getCache: vi.fn(),
    setCache: vi.fn()
}))

describe("calculates total, weak, strong, and retention rate", async () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("calculates total, weak, strong, and retention rate", async () => {
        getCache.mockResolvedValue(null);
        prisma.review.findMany.mockResolvedValue([
            { rating: 1 },
            { rating: 4 },
            { rating: 3 }
        ])
        prisma.deck.findMany.mockResolvedValue([]);
        
        const stats = await getStats("user-1");

        expect(stats.totalReviews).toBe(3);
        expect(stats.weakCount).toBe(1);
        expect(stats.strongCount).toBe(2);
        expect(stats.retentionRate).toBe(67);
        expect(setCache).toHaveBeenCalledWith("user:user-1:stats", stats, 300);
    })
})
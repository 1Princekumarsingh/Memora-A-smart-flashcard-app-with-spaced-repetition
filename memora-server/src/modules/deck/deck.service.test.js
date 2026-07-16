import { beforeEach, vitest, describe, it, vi, expect} from "vitest";
import { prisma } from "../../config/prisma.js";
import { deleteCache, getCache, setCache } from "../../utils/cache.js";
import { getAllDecks } from "./deck.service.js";

vi.mock("../../config/prisma.js", () => ({
    prisma: {
        deck: {
            findMany: vi.fn()
        }
    }
}))

vi.mock("../../utils/cache.js", () => ({
    setCache: vi.fn(),
    getCache: vi.fn(),
    deleteCache: vi.fn()
}))

describe("deck.service getAllDecks", () => {
    beforeEach(()=>{
        vi.clearAllMocks()
    })

    it("return cached data and does not call prisma when cache hit", async ()=> {

        const cachedDecks = [{ id: "deck-1", name: "React" }];
        getCache.mockResolvedValue(cachedDecks);

        const result = await getAllDecks("user-1");

        expect(result).toEqual(cachedDecks);
        expect(prisma.deck.findMany).not.toHaveBeenCalled();
    })

    it ("call prisma, store cache and return the value", async () => {

        const decks = [{ id: "deck-1", name: "React" }];
        getCache.mockResolvedValue(null);
        prisma.deck.findMany.mockResolvedValue(decks);

        const result = await getAllDecks("user-1");

        expect(prisma.deck.findMany).toHaveBeenCalledWith({
            where: {
                userId: "user-1"
            },
            include: {
                cards: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        expect(setCache).toHaveBeenCalledWith("user:user-1:decks", decks, 300);
        expect(result).toEqual(decks);
    })
})
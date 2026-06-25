import { prisma } from "../../config/prisma.js";
import { deleteCache, getCache, setCache } from "../../utils/cache.js";
import { cacheKeys } from "../../constants/cacheKeys.js";

export const getAllDecks = async (userId) => {
    const key = cacheKeys.decks(userId);

    const cached = await getCache(key);

    if(cached){
        return cached
    }

    const decks = await prisma.deck.findMany({
        where: {
            userId,
        },
        include: {
            cards: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    await setCache(key, decks, 300)

    return decks
}

export const getDeckById = async (deckId, userId) => {

    const key = cacheKeys.deck(userId, deckId);

    const cached = await getCache(key);

    if(cached){
        return cached;
    }

    const deck = await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId,
        },
        include: {
            cards: true
        }
    })

    await setCache(
        key,
        deck
    )

    return deck;
}

export const createDeck = async (name, userId) => {
    const deck = await prisma.deck.create({
        data: {
            name,
            userId
        }
    })

    await deleteCache(cacheKeys.decks(userId));

    return deck;

}

export const deleteDeck = async (id, userId) => {
    const deck = await prisma.deck.delete({
        where: {id}
    })

    await deleteCache(
        cacheKeys.decks(userId),
        cacheKeys.deck(userId, id),
        cacheKeys.study(id),
        cacheKeys.stats(userId),
        cacheKeys.heatmap(userId)
    );

    return deck;
}

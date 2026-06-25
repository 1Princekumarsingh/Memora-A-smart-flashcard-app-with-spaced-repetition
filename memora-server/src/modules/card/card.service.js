import { prisma } from "../../config/prisma.js";
import { deleteCache, getCache, setCache } from "../../utils/cache.js";
import { cacheKeys } from "../../constants/cacheKeys.js";

export const getCardsByDeckId = async(deckId) => {
    return prisma.card.findMany({
        where: {deckId},
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const getDueCardsByDeckId = async(deckId) => {
    const key = cacheKeys.study(deckId);

    const cached = await getCache(key);

    if (cached) {
      return cached;
    }

    const cards = await prisma.card.findMany({
        where: {
            deckId,
            OR: [
                { nextReview: null },
                { nextReview: { lte: new Date() } }
            ]
        },
        orderBy: {
            nextReview: "asc"
        }
    })

    await setCache(key, cards, 120);

    return cards
}

export const createCard = async (data) => {
    const card = await prisma.card.create({
        data,
        include: {
            deck: {
                select: {
                    userId: true
                }
            }
        }
    })

    const { deck, ...cardData } = card;

    await deleteCache(
        cacheKeys.decks(deck.userId),
        cacheKeys.deck(deck.userId, card.deckId),
        cacheKeys.study(card.deckId)
    );

    return cardData
}

export const deleteCard = async(id) => { 
    const card =  await prisma.card.delete({
        where: {id},
        include: {
            deck: {
                select: {
                    userId: true
                }
            }
        }
    })

    const { deck, ...cardData } = card;

    await deleteCache(
        cacheKeys.decks(deck.userId),
        cacheKeys.deck(deck.userId, card.deckId),
        cacheKeys.study(card.deckId),
        cacheKeys.stats(deck.userId),
        cacheKeys.heatmap(deck.userId)
    );

    return cardData
}

import { prisma } from "../../config/prisma.js";

export const getAllDecks = async (userId) => {
    return prisma.deck.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const getDeckById = async (deckId, userId) => {
    return prisma.deck.findFirst({
        where: {
            id: deckId,
            userId,
        },
        include: {
            cards: true
        }
    })
}

export const createDeck = async (name, userId) => {
    return prisma.deck.create({
        data: {
            name,
            userId
        }
    })
}

export const deleteDeck = async (id) => {
    return prisma.deck.delete({
        where: {id}
    })
}

export const getDueCards = async (id) => {
    return prisma.card.findMany({
        where: {
            deckId: id,
            OR: [
                { nextReview: null },
                { nextReview: { lte: new Date() } }
            ]
        },
        orderBy: {
            nextReview: "asc"
        }
    })
}
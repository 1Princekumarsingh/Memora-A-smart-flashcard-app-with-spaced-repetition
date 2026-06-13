import { prisma } from "../../config/prisma.js";

export const getAllDecks = async () => {
    return prisma.deck.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const getDeckById = async (id) => {
    return prisma.deck.findUnique({
        where: {id},
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
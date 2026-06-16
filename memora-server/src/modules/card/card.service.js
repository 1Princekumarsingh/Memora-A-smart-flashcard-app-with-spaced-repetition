import { prisma } from "../../config/prisma.js";

export const getCardsByDeckId = async(deckId) => {
    return prisma.card.findMany({
        where: {deckId},
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const createCard = async (data) => {
    return prisma.card.create({
        data
    })
}

export const deleteCard = async(id) => { 
    return prisma.card.delete({
        where: {id}
    })
}
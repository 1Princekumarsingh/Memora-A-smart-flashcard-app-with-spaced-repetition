import { prisma } from "../../config/prisma.js";
import { calculateSchedule } from "../../utils/spacedRepetition.js";
import { cacheKeys } from "../../constants/cacheKeys.js";
import { deleteCache } from "../../utils/cache.js";

export const submitReview = async({cardId, rating}) => {
    const review = await prisma.review.create({
        data: {
            rating, 
            cardId
        }
    })

    const card = await prisma.card.findUnique({
        where: {
            id : cardId
        },
        include: {
            deck: {
                select: {
                    userId: true
                }
            }
        }
    })

    const schedule = calculateSchedule(card, rating)

    await prisma.card.update({
        where:{
            id: cardId
        },
        data:{
            repetitions: schedule.repetitions,
            interval : schedule.interval,
            easeFactor: schedule.easeFactor,
            nextReview: schedule.nextReview
        }
    })

    await deleteCache(
        cacheKeys.decks(card.deck.userId),
        cacheKeys.deck(card.deck.userId, card.deckId),
        cacheKeys.study(card.deckId),
        cacheKeys.stats(card.deck.userId),
        cacheKeys.heatmap(card.deck.userId)
    );

    return review;
}

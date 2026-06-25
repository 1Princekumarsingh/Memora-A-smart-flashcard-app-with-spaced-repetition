import { prisma } from "../../config/prisma.js";
import { getNextReviewDate } from "../../utils/spacedRepetition.js";
import { cacheKeys } from "../../constants/cacheKeys.js";
import { deleteCache } from "../../utils/cache.js";

export const submitReview = async({cardId, rating}) => {
    const review = await prisma.review.create({
        data: {
            rating, 
            cardId
        }
    })

    const nextReview = getNextReviewDate(rating);

    const card = await prisma.card.update({
        where:{
            id: cardId
        },
        data:{
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

    await deleteCache(
        cacheKeys.decks(card.deck.userId),
        cacheKeys.deck(card.deck.userId, card.deckId),
        cacheKeys.study(card.deckId),
        cacheKeys.stats(card.deck.userId),
        cacheKeys.heatmap(card.deck.userId)
    );

    return review;
}

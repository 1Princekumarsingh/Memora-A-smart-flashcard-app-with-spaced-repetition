import { prisma } from "../../config/prisma.js";
import { getNextReviewDate } from "../../utils/spacedRepetition.js";

export const submitReview = async({cardId, rating}) => {
    const review = await prisma.review.create({
        data: {
            rating, 
            cardId
        }
    })

    const nextReview = getNextReviewDate(rating);

    await prisma.card.update({
        where:{
            id: cardId
        },
        data:{
            nextReview
        }
    })

    return review;
}
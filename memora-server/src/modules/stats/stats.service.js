import { prisma } from "../../config/prisma.js";

export async function getStats() {
    const reviews = await prisma.review.findMany({
        include: {
            card: {
                include: {
                    deck: true
                }
            }
        }
    });

    const totalReviews = reviews.length;

    const forgotCount = reviews.filter((r) => r.rating === 1).length;
    const hardCount = reviews.filter((r) => r.rating === 2).length;
    const goodCount = reviews.filter((r) => r.rating === 3).length;
    const easyCount = reviews.filter((r) => r.rating === 4).length;

    const weakCount = forgotCount + hardCount;
    const strongCount = goodCount + easyCount;

    const retentionRate = totalReviews === 0 ? 0 : Math.round((strongCount / totalReviews) * 100);

    const decks = await prisma.deck.findMany({
        include: {
            cards: {
                include: {
                    reviews: true
                }
            }
        }
    });

    const mostForgottenCards = decks
        .flatMap((deck) =>
            deck.cards.map((card) => {
                const total = card.reviews.length;
                const weak = card.reviews.filter((r) => r.rating <= 2).length;
                const forgetRate = total === 0 ? 0 : Math.round((weak / total) * 100);

                return {
                    id: card.id,
                    question: card.question,
                    answer: card.answer,
                    deckId: deck.id,
                    deckName: deck.name,
                    totalReviews: total,
                    weakReviews: weak,
                    forgetRate,
                };
            })
        )
        .filter((card) => card.weakReviews > 0)
        .sort((a, b) => b.forgetRate - a.forgetRate)
        .slice(0, 5);

    const mostForgottenDecks = decks
        .map((deck) => ({
            id: deck.id,
            name: deck.name,
            cards: mostForgottenCards.filter((card) => card.deckId === deck.id),
        }))
        .filter((deck) => deck.cards.length > 0);

    return {
        totalReviews,
        forgotCount,
        hardCount,
        goodCount,
        easyCount,
        weakCount,
        strongCount,
        retentionRate,
        mostForgottenDecks
    };
}

export const getHeatmapData = async() => {
    const reviews = await prisma.review.findMany({
        select: {
            reviewedAt: true
        }
    });

    const map = {};
    for (const review of reviews) {
        const date = review.reviewedAt.toISOString().split("T")[0];
        map[date] = (map[date] || 0) + 1;
    }

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);

    const result = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        const formatted = current.toISOString().split('T')[0];
        result.push({
            date: formatted,
            count: map[formatted] || 0
        });
        current.setDate(current.getDate() + 1);
    }

    return result;
};
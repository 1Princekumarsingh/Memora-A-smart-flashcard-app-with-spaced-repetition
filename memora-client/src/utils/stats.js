export function getStudyStats(decks){
    const allCards = decks.flatMap((deck)=> deck.cards);

    const allReviews =  allCards.flatMap((card)=> card.reviews);
    const totalReviews = allReviews.length;

    const easyCount = allReviews.filter((review) => review.rating === "easy").length;
    const mediumCount = allReviews.filter((review)=> review.rating === "medium").length;
    const hardCount = allReviews.filter((review)=> review.rating === "hard").length;

    const retentionRate = totalReviews === 0? 0 : Math.round(((easyCount + mediumCount)/ totalReviews)*100)

    return {
        totalReviews,
        easyCount,
        mediumCount,
        hardCount,
        retentionRate
    }
}

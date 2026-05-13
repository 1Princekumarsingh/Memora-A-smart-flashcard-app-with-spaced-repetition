export function getDueCards(cards){
    const now = Date.now();

    return cards.filter((card) => {
        const nextReviewTime = new Date(card.nextReview).getTime();

        return nextReviewTime <= now;
    });
}

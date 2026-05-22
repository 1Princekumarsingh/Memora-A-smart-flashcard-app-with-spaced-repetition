import { RATING_VALUES, isWeakReview } from "../constants/ratings";

export function getStudyStats(decks) {
  const allCards = decks.flatMap((deck) => deck.cards);

  const allReviews = allCards.flatMap((card) => card.reviews);
  const totalReviews = allReviews.length;

  const forgotCount = allReviews.filter((review) => review.rating === RATING_VALUES.FORGOT).length;
  const hardCount = allReviews.filter((review) => review.rating === RATING_VALUES.HARD).length;
  const goodCount = allReviews.filter((review) => review.rating === RATING_VALUES.GOOD).length;
  const easyCount = allReviews.filter((review) => review.rating === RATING_VALUES.EASY).length;

  const weakCount = allReviews.filter((review) => isWeakReview(review.rating)).length;
  const strongCount = totalReviews - weakCount;
  const retentionRate = totalReviews === 0 ? 0 : Math.round((strongCount / totalReviews) * 100);

  return {
    totalReviews,
    forgotCount,
    hardCount,
    goodCount,
    easyCount,
    weakCount,
    strongCount,
    retentionRate,
  }
}

export function getMostForgottenDecks(decks, limit = 5) {
  const mostForgottenCards = getMostForgottenCards(decks, limit);

  return decks
    .map((deck) => ({
      id: deck.id,
      name: deck.name,
      cards: mostForgottenCards.filter((card) => card.deckId === deck.id),
    })).filter((deck) => deck.cards.length > 0);
}

export function getMostForgottenCards(decks, limit = 5) {
  return decks
    .flatMap((deck) =>
      deck.cards.map((card) => {
        const totalReviews = card.reviews.length;
        const weakReviews = card.reviews.filter((review) => isWeakReview(review.rating)).length;
        const forgetRate = totalReviews === 0 ? 0 : Math.round((weakReviews / totalReviews) * 100);

        return {
          id: card.id,
          question: card.question,
          answer: card.answer,
          deckId: deck.id,
          deckName: deck.name,
          totalReviews,
          weakReviews,
          forgetRate,
        }
      })
    )
    .filter((card) => card.weakReviews > 0)
    .sort((a, b) => b.forgetRate - a.forgetRate)
    .slice(0, limit);
}

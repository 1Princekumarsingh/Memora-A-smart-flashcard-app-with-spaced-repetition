import { RATING_VALUES, isWeakReview } from "../constants/ratings";

export function getStudyStats(decks) {
  const allCards = decks.flatMap((deck) => deck.cards);

  const allReviews = allCards.flatMap((card) => card.reviews);
  const totalReviews = allReviews.length;

  const forgotCount = allReviews.filter(
    (review) => review.rating === RATING_VALUES.FORGOT
  ).length;
  const hardCount = allReviews.filter(
    (review) => review.rating === RATING_VALUES.HARD
  ).length;
  const goodCount = allReviews.filter(
    (review) => review.rating === RATING_VALUES.GOOD
  ).length;
  const easyCount = allReviews.filter(
    (review) => review.rating === RATING_VALUES.EASY
  ).length;

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
  };
}

import { RATING_VALUES } from "../constants/ratings";

export function getNextReviewDate(rating) {
  const now = new Date();

  switch (rating) {
    case RATING_VALUES.FORGOT:
      now.setDate(now.getDate() + 1);
      break;

    case RATING_VALUES.HARD:
      now.setDate(now.getDate() + 2);
      break;

    case RATING_VALUES.GOOD:
      now.setDate(now.getDate() + 4);
      break;

    case RATING_VALUES.EASY:
      now.setDate(now.getDate() + 7);
      break;

    default:
      now.setDate(now.getDate() + 1);
  }

  return now.toISOString();
}

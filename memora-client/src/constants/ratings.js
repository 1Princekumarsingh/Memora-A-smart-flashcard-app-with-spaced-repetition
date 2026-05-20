export const RATING_VALUES = {
  FORGOT: 1,
  HARD: 2,
  GOOD: 3,
  EASY: 4,
};

export const RATINGS = {
  [RATING_VALUES.FORGOT]: "Forgot",
  [RATING_VALUES.HARD]: "Hard",
  [RATING_VALUES.GOOD]: "Good",
  [RATING_VALUES.EASY]: "Easy",
};

export const RATING_OPTIONS = [
  {
    value: RATING_VALUES.FORGOT,
    label: RATINGS[RATING_VALUES.FORGOT],
    className: "bg-red-500 shadow-red-100 focus:ring-red-400"
  },
  {
    value: RATING_VALUES.HARD,
    label: RATINGS[RATING_VALUES.HARD],
    className: "bg-amber-500 shadow-amber-100 focus:ring-amber-400"
  },
  {
    value: RATING_VALUES.GOOD,
    label: RATINGS[RATING_VALUES.GOOD],
    className:"bg-blue-600 shadow-blue-100 focus:ring-blue-500"
  },
  {
    value: RATING_VALUES.EASY,
    label: RATINGS[RATING_VALUES.EASY],
    className: "bg-emerald-600 shadow-emerald-100 focus:ring-emerald-500"
  },
];

export function isWeakReview(rating) {
  return rating <= RATING_VALUES.HARD;
}

import { RATING_OPTIONS } from "../../../constants/ratings";

export default function RatingBar({ onRate }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {RATING_OPTIONS.map((rating) => (
        <button
          key={rating.value}
          className={`inline-flex h-12 min-w-24 items-center justify-center rounded-lg px-5 text-base font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${rating.className}`}
          onClick={() => onRate(rating.value)}
        >
          {rating.label}
        </button>
      ))}
    </div>
  );
}

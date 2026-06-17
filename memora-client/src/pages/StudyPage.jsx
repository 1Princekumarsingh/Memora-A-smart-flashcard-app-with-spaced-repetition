import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom"

import useDeckStore from "../features/deck/hooks/useDeckStore";
import useStudySession from "../features/study/hooks/useStudySession";
import { useReview } from "../features/study/hooks/useReviewMutation";

import StudyCard from "../features/study/components/StudyCard";
import RatingBar from "../features/study/components/RatingBar";
import { getDueCards } from "../utils/getDueCards";
import useKeyBoardShortcut from "../features/study/hooks/useKeyboardShortcut";
import { RATING_VALUES } from "../constants/ratings";
import useToastStore from "../store/toastStore";
import { AnimatePresence, motion } from "framer-motion";

export default function StudyPage() {
  const { id } = useParams();

  return <StudySession key={id} id={id} />
}

function StudySession({ id }) {
  const reviewMutation = useReview();
  const addToast = useToastStore((state) => state.addToast);
  const decks = useDeckStore((s) => s.decks);
  const deck = decks.find((d) => d.id === Number(id))
  
  const [state, dispatch] = useStudySession();
  const [dueCardIds] = useState(() =>
    deck ? getDueCards(deck.cards).map((card) => card.id) : []
  );

  const currentCardId = dueCardIds[state.currentIndex];
  const currentCard = deck?.cards.find((card) => card.id === currentCardId);

  const handleNext = () => {
    dispatch({ type: "NEXT" });
  }

  const handleRate = async (rating) => {
    if (!deck || !currentCard || !state.revealed) return;

    await reviewMutation.mutateAsync({
      cardId: currentCard.id,
      rating,
    });

    const isLastCard = state.currentIndex === dueCardIds.length - 1;
    if (isLastCard) {
      addToast("Session completed!", "success");
    }

    handleNext();
  }

  useKeyBoardShortcut({
    " " : () => dispatch({type: "FLIP"}),
    "1" : () => handleRate(RATING_VALUES.FORGOT),
    "2" : () => handleRate(RATING_VALUES.HARD),
    "3" : () => handleRate(RATING_VALUES.GOOD),
    "4" : () => handleRate(RATING_VALUES.EASY)
  })

  if (!deck) {
    return <Navigate to="/" replace />
  }

  if (deck.cards.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <p className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          No cards in this deck.
        </p>
      </div>
    )
  }

  if(dueCardIds.length === 0){
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">No cards due today.</h1>
      </div>
    )
  }

  if (state.currentIndex >= dueCardIds.length) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <div className="rounded-xl border border-gray-200 bg-white px-8 py-12 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm font-medium uppercase tracking-wide text-green-600">
            Done
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-slate-100">
            Session completed!
          </h1>
          <Link
            to={`/`}
            className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!currentCard) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <p className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          This card is no longer available.
        </p>
      </div>
    )
  }

  const cardNumber = state.currentIndex + 1;
  const progress = (cardNumber / dueCardIds.length) * 100;

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
            Studying
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            {deck.name}
          </h1>
        </div>

        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
          Card {cardNumber} of {dueCardIds.length}
        </p>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
        <motion.div
          className="h-full rounded-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{duration:0.3, ease:"easeOut"}}
        />
      </div>

      <AnimatePresence mode="wait">
        <StudyCard
          key={currentCard.id}
          card={currentCard}
          flipped={state.flipped}
        />
      </AnimatePresence>

      <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <button
          onClick={() => dispatch({ type: "FLIP" })}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-6 text-base font-semibold text-white shadow-sm shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:shadow-none dark:focus:ring-offset-slate-950"
        >
          {state.flipped ? "Show Question" : "Reveal Answer"}
        </button>

        {state.revealed && (
          <RatingBar onRate={handleRate}/>
        )}

      </div>
    </div>
  )
}

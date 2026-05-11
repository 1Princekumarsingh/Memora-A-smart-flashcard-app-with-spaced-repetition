import { Link, useParams, Navigate } from "react-router-dom"

import useDeckStore from "../features/deck/hooks/useDeckStore";
import useStudySession from "../features/study/hooks/useStudySession";

import StudyCard from "../features/study/components/StudyCard";

export default function StudyPage() {
  const { id } = useParams();

  const decks = useDeckStore((s) => s.decks);
  const deck = decks.find((d) => d.id === Number(id))
  
  const [state, dispatch] = useStudySession();

  if (!deck) {
    return <Navigate to="/" replace />
  }

  if (deck.cards.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <p className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-gray-500">
          No cards in this deck.
        </p>
      </div>
    )
  }
  
  //session finished
  if (state.currentIndex >= deck.cards.length) {
    return (
      <div className="mx-auto max-w-2xl p-6 text-center">
        <div className="rounded-xl border border-gray-200 bg-white px-8 py-12 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-green-600">
            Done
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Session completed!
          </h1>
          <Link
            to={`/decks/${deck.id}`}
            className="mt-6 inline-flex rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Back to deck
          </Link>
        </div>
      </div>
    )
  }

  const currentCard = deck.cards[state.currentIndex];
  const cardNumber = state.currentIndex + 1;
  const progress = (cardNumber / deck.cards.length) * 100;

  const handleNext = () => {
    if (state.currentIndex === deck.cards.length - 1) {
      dispatch({ type: "COMPLETE" });
    }
    dispatch({ type: "NEXT" });
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Studying
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            {deck.name}
          </h1>
        </div>

        <p className="text-sm font-medium text-gray-500">
          Card {cardNumber} of {deck.cards.length}
        </p>
      </div>

      <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <StudyCard card={currentCard} flipped={state.flipped} />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={() => dispatch({ type: "FLIP" })}
          className="rounded-md bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          {state.flipped ? "Show question" : "Show answer"}
        </button>
        <button
          onClick={handleNext}
          className="rounded-md bg-green-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-green-700"
        >
          {state.currentIndex === deck.cards.length - 1 ? "Finish" : "Next card"}
        </button>
      </div>
    </div>
  )
}

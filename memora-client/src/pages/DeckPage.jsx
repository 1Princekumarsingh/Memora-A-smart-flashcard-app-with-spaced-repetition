import { useParams } from "react-router-dom";
import { useDecks } from "../features/deck/hooks/useDecks.js"; 
import { Link } from "react-router-dom";
import useCards from "../features/card/hooks/useCards.js";
import { useCreateCard } from "../features/card/hooks/useCardMutation.js";

import CardForm from "../features/card/components/CardForm";
import CardList from "../features/card/components/CardList";

import useToastStore from "../store/toastStore";

export default function DeckPage() {
  const { deckId } = useParams();

  const { data: decks = [], isLoading: isLoadingDecks } = useDecks();
  const { data: cards = [], isLoading } = useCards(deckId);
  const createCardMutation = useCreateCard();
  const addToast = useToastStore((state) => state.addToast);

  const deck = decks.find((d) => d.id === Number(deckId));

  if (isLoadingDecks || isLoading) {
    return (
      <p>Loading decks...</p>
    );
  }

  if (!deck) {
    return <p className="text-slate-600 dark:text-slate-400">Deck not found.</p>;
  }

  const handleAddCard = async (data) => {
    try {
      await createCardMutation.mutateAsync({
        deckId,
        question: data.question,
        answer: data.answer,
      });
      addToast("Card added successfully", "success");
    } catch {
      addToast("Failed to add card", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {deck.name}
      </h1>

      <Link to={`/study/${deck.id}`}
      className="inline-block mb-6 bg-purple-600 text-white px-4 py-2 rounded-md"
      onClick={() => addToast("Review session started", "info")}>
        Start Study
      </Link>

      <CardForm onAddCard={handleAddCard}/>
      <CardList cards={cards}/>
    </div>
  );
}

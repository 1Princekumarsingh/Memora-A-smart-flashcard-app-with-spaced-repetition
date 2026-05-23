import { useParams } from "react-router-dom";
import useDeckStore from "../features/deck/hooks/useDeckStore";
import { Link } from "react-router-dom";

import CardForm from "../features/card/components/CardForm";
import CardList from "../features/card/components/CardList";

import useToastStore from "../store/toastStore";

export default function DeckPage() {
  const{id} = useParams();

  const decks = useDeckStore((s) => s.decks);
  const addCard = useDeckStore((s)=> s.addCard);
  const deck = decks.find((d) => d.id === Number(id));
  const addToast = useToastStore((state) => state.addToast);

  if (!deck) {
    return <p>Deck not found.</p>;
  }

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {deck.name}
      </h1>

      <Link to={`/study/${deck.id}`}
      className="inline-block mb-6 bg-purple-600 text-white px-4 py-2 rounded-md"
      onClick={() => addToast("Review session started", "info")}>
        Start Study
      </Link>

      <CardForm onAddCard={(card)=> addCard(deck.id, card)}/>
      <CardList cards={deck.cards}/>
    </div>
  )
}
import { useParams } from "react-router-dom";
import useDeckStore from "../features/deck/hooks/useDeckStore";

import CardForm from "../features/deck/components/CardForm";
import CardList from "../features/deck/components/CardList";

export default function DeckPage() {
  const{id} = useParams();

  const decks = useDeckStore((s) => s.decks);
  const addCard = useDeckStore((s)=> s.addCard);

  const deck = decks.find((d) => d.id === Number(id));
  if (!deck) {
    return <p>Deck not found.</p>;
  }

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {deck.name}
      </h1>

      <CardForm onAddCard={(card)=> addCard(deck.id, card)}/>
      <CardList cards={deck.cards}/>
    </div>
  )
}
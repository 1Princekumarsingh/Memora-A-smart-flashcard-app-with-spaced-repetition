import { Link } from "react-router-dom";

export function DeckCard({ deck }) {
  return (
    <Link
      to={`/decks/${deck.id}`}
      className="block p-4 border rounded-md hover:bg-gray-50">
      
      <h3 className="font-semibold">{deck.name}</h3>

      <p className="text-sm text-gray-500 mt-1">
        {deck.cards.length} cards
      </p>
    </Link>
  );
}
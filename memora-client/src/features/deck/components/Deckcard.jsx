import { Link } from "react-router-dom";

export function DeckCard({ deck }) {
  return (
    <Link
      to={`/decks/${deck.id}`}
      className="block p-4 border rounded-md hover:bg-gray-50">
      
      <h3 className="font-semibold">{deck.name}</h3>
    
    </Link>
  );
}
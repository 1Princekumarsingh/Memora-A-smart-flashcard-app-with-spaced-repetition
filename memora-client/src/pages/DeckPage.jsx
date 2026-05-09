import { useParams } from "react-router-dom";

export default function DeckPage() {
  const{id} = useParams();

  return <div>Deck ID: {id}</div>
}
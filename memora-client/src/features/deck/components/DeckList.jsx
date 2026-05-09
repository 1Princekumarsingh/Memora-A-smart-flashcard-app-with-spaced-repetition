import useDeckStore from "../hooks/useDeckStore";
import { DeckCard } from "./Deckcard";

export default function DeckList(){
    const decks = useDeckStore((s) => s.decks);

    if (decks.length === 0){
        return <p>No decks yet. Create one!</p>
    }
    return(
        <div className="grid gap-3">
            {decks.map((deck) => <DeckCard key={deck.id} deck={deck}/>)}
        </div>
    )
}

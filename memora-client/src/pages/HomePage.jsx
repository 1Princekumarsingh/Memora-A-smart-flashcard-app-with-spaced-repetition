import DeckForm from "../features/deck/components/DeckForm"
import DeckList from "../features/deck/components/DeckList"

export default function HomePage() {
  return(
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Decks</h1>
      <DeckForm/>
      <DeckList/>
    </div>
  )
}
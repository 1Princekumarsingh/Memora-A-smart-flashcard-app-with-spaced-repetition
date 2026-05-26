import DeckForm from "../features/deck/components/DeckForm"
import DeckList from "../features/deck/components/DeckList"
import PageWrapper from "../components/PageWrapper"

export default function HomePage() {
  return(
    <PageWrapper>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Your Decks</h1>
        <DeckForm/>
        <DeckList/>
      </div>
    </PageWrapper>
  )
}

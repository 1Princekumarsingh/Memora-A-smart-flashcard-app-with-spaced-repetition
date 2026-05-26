export default function CardList({cards}){
    if (cards.length === 0){
        return <p className="text-slate-600 dark:text-slate-400">No Cards</p>
    }
    
    return(
        <div className="space-y-3">
            {cards.map((card) => (
                <div key={card.id} className="rounded-md border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                        Q: {card.question}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-slate-300">
                        A: {card.answer}
                    </p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">
                        Last reviewed: {" "}
                        {card.reviews.at(-1)?.reviewedAt ? new Date(card.reviews.at(-1).reviewedAt).toLocaleDateString(): "Never"}
                    </p>
                </div>
            ))}
        </div>
    )
}

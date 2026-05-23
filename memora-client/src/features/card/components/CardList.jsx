export default function CardList({cards}){
    if (cards.length === 0){
        return <p>No Cards</p>
    }
    
    return(
        <div className="space-y-3">
            {cards.map((card) => (
                <div key={card.id} className="border rounded-md p-4 bg-white">
                    <h3 className="font-semibold">
                        Q: {card.question}
                    </h3>
                    <p className="text-gray-600 mt-2">
                        A: {card.answer}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Last reviewed: {" "}
                        {card.reviews.at(-1)?.reviewedAt ? new Date(card.reviews.at(-1).reviewedAt).toLocaleDateString(): "Never"}
                    </p>
                </div>
            ))}
        </div>
    )
}

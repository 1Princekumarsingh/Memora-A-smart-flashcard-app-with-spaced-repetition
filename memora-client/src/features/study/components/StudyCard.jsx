export default function StudyCard({ card, flipped }) {
    return (
        <article className="flex min-h-80 items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="max-w-xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600">
                    {flipped ? "Answer" : "Question"}
                </p>

                <h2 className="whitespace-pre-wrap break-words text-2xl font-semibold leading-relaxed text-gray-900 sm:text-3xl">
                    {flipped ? card.answer : card.question}
                </h2>
            </div>
        </article>
    )
}

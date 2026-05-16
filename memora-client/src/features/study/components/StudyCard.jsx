export default function StudyCard({
  card,
  flipped,
}) {
  return (
    <div className="perspective">
      <div
        className={`relative min-h-[260px] transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        
        {/* front */}
        <div
          className="absolute inset-0 border rounded-xl p-8 bg-white shadow-md flex items-center justify-center text-center backface-hidden">
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Question
            </p>

            <h2 className="text-2xl font-semibold">
              {card.question}
            </h2>
          </div>
        </div>

        {/* back */}
        <div
          className="absolute inset-0 border rounded-xl p-8 bg-blue-50 shadow-md flex items-center justify-center text-center rotate-y-180 backface-hidden">
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Answer
            </p>

            <h2 className="text-2xl font-semibold">
              {card.answer}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
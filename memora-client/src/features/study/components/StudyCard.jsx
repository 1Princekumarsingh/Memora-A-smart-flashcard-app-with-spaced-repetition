import { AnimatePresence, motion } from "framer-motion";

export default function StudyCard({
  card,
  flipped,
}) {
  const face = flipped
    ? {
        key: "answer",
        label: "Answer",
        text: card.answer,
        eyebrowClassName: "bg-blue-50 text-blue-700 ring-blue-100",
        surfaceClassName: "border-blue-400 bg-blue-50/80",
      }
    : {
        key: "question",
        label: "Question",
        text: card.question,
        eyebrowClassName: "bg-slate-100 text-slate-700 ring-slate-200",
        surfaceClassName: "border-slate-500 bg-white",
      };

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={face.key}
          initial={{ opacity: 0, scale: 0.98, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.98, rotateY: -10 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={`relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-xl border p-6 text-center shadow-sm ring-1 ring-black/5 sm:p-8 ${face.surfaceClassName}`}
        >
          <div className="absolute left-5 top-5">
            <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ${face.eyebrowClassName}`}>
              {face.label}
            </span>
          </div>

          <div className="mx-auto max-w-2xl px-2 pt-8">
            <h2 className="whitespace-pre-wrap break-words text-2xl font-semibold leading-snug text-slate-900 sm:text-3xl">
              {face.text}
            </h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function DeckCard({ deck }) {
  return (
    <motion.div
    whileHover={{y:-4}}
    transition={{duration:0.15}}
    >
      <Link
      to={`/decks/${deck.id}`}
      className="block rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
      
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{deck.name}</h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        {deck.cards.length} cards
      </p>

    </Link>
    </motion.div>
  );
}

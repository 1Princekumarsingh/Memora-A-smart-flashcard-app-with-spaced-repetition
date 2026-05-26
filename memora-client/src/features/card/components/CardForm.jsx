import { useState } from "react";

export default function CardForm({ onAddCard }){
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

    if (!question.trim() || !answer.trim()) return;

    onAddCard({question, answer})
    setQuestion("");
    setAnswer("");
    }
    return(
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input value={question} onChange={(e)=> setQuestion(e.target.value)} placeholder="Question" className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500" />

            <textarea value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder="Answer" className="w-full rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"/>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Add Card
            </button>
        </form>
    )
}

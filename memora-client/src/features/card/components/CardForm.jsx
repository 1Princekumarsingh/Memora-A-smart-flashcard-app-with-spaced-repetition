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
            <input value={question} onChange={(e)=> setQuestion(e.target.value)} placeholder="Question" className="w-full border p-2 rounded-md" />

            <textarea value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder="Answer" className="w-full border p-2 rounded-md"/>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Add Card
            </button>
        </form>
    )
}

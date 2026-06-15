import { useCreateDeck } from "../hooks/useDeckMutations";
import { useState } from "react";
import useToastStore from "../../../store/toastStore";

export default function DeckForm(){
    const [name, setName] = useState("");
    const createDeckMutation = useCreateDeck();
    const addToast = useToastStore((state)=> state.addToast);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name.trim()){
            addToast("Please enter a deck name", "error");
            return
        }

    try {
        await createDeckMutation.mutateAsync({name});

        setName("")
        addToast("Deck created successfully", "success")

    } catch {
        addToast("Failed to create deck", "error")
    }
}
    return(
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New deck name" className="flex-grow rounded-md border border-gray-300 bg-white p-2 text-slate-900 placeholder:text-gray-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"/>
            <button className="bg-blue-600 text-white px-4 rounded-md">Add</button>
        </form>
    )
}

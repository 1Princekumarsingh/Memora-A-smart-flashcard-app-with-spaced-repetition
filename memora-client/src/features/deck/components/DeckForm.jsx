import useDeckStore from "../hooks/useDeckStore";
import { useState } from "react";
import useToastStore from "../../../store/toastStore";

export default function DeckForm(){
    const [name, setName] = useState("");
    const addDeck = useDeckStore((s) => s.addDeck);
    const addToast = useToastStore((state)=> state.addToast);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name.trim()){
            addToast("Please enter a deck name", "error");
            return
        }

        addDeck(name);
        setName("");
        addToast("Deck created successfully", "success");
    }

    return(
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New deck name" className="border p-2 rounded-md flex-grow"/>
            <button className="bg-blue-600 text-white px-4 rounded-md">Add</button>
        </form>
    )
}
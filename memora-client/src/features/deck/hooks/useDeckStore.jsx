import { create } from "zustand";


const useDeckStore = create((set) => ({
    decks: [],
    addDeck: (name) => set((state) => ({
        decks: [...state.decks, {id: Date.now(), name}]
    }))
}))

export default useDeckStore;
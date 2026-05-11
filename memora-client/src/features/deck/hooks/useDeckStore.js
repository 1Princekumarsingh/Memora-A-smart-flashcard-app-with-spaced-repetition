import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useDeckStore = create(immer((set) => ({
    decks: [],

    addDeck: (name) => set((state) => ({
        decks: [...state.decks, {id: Date.now(), name, cards: []}]
    })),
    
    addCard: (deckId, card) => set((state) => {
       const deck = state.decks.find((d => d.id === Number(deckId)))

       if(!deck) return;

       deck.cards.push({
        id: Date.now(),
        ...card,
       })
    })
})))

export default useDeckStore;

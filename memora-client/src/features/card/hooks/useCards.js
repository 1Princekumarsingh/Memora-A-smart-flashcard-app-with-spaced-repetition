import { useQuery } from "@tanstack/react-query";
import { getCards } from "../api";

export default function useCards(deckId){
    return useQuery({
        queryKey: ["cards", deckId], // react cache only one deckId pased by queryFn 
        queryFn: () => getCards(deckId),
        enabled: !!deckId // controls whether the query should run automatically
    })
}
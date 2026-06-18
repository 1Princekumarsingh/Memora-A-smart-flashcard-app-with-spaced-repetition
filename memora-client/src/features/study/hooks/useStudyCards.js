import { useQuery } from "@tanstack/react-query";

import { getStudyCards } from "../api";

export function useStudyCards(deckId){
    return useQuery({
        queryKey:["studyCards", deckId],
        queryFn: () => getStudyCards(deckId), 
        enabled: !!deckId
    })
}
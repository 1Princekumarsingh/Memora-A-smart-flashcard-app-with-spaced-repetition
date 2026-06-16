import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard, deleteCard } from "../api";

export function useCreateCard(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCard,

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["cards", variables.deckId]
            })
        }
    })
}

export function useDeleteCard(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCard,

        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["cards"]
            })
        }
    })
}

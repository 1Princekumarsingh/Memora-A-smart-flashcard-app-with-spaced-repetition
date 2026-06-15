import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeck, deleteDeck } from "../api";

export function useCreateDeck() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDeck,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["decks"]
            })
        }
    })
}

export function useDeleteDeck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDeck,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["decks"],
      })
    }
  })
}
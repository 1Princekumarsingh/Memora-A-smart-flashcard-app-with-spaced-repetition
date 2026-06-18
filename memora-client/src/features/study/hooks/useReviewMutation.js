import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "../api";

export function useReview(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitReview,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["studyCards"]
            });
            queryClient.invalidateQueries({
                queryKey: ["decks"]
            });
        }
    })
}
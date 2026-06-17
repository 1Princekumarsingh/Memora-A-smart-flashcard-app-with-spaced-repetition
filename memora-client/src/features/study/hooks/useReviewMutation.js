import { useMutation } from "@tanstack/react-query";
import { submitReview } from "../api";

export function useReview(){
    return useMutation({
        mutationFn: submitReview
    })
}
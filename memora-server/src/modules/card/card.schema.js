import {z} from "zod";
export const createCardSchema = z.object({
    question: z.string().trim().min(1, "Question is required").max(300),
    answer: z.string().trim().min(1, "Answer is required").max(300),

    deckId: z.string()
})
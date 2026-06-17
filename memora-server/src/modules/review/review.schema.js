import { z } from "zod";

export const createReviewSchema = z.object({
    cardId: z.string().min(1),
    rating: z.number().int().min(1).max(4)
})
import { z } from "zod";

export const createDeckSchema = z.object({
    name: z.string().trim().min(1, "Deck name is required").max(60, "Deck name can't exceed 60 characters")
})
import { Router } from "express";

import { getDecks, getDeck, createDeck, deleteDeck } from "./deck.controller.js";
import { getCards, createCard } from "../card/card.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import { validate } from "../../middleware/validate.js";
import { createDeckSchema } from "./deck.schema.js";
import { createCardSchema } from "../card/card.schema.js";

const router = Router();

router.get("/", asyncHandler(getDecks));
router.get("/:deckId", asyncHandler(getDeck));

router.post("/", validate(createDeckSchema), asyncHandler(createDeck));
router.delete("/:deckId", asyncHandler(deleteDeck));

router.get("/:deckId/cards",asyncHandler(getCards));
router.post("/:deckId/cards",validate(createCardSchema),asyncHandler(createCard));

export default router;
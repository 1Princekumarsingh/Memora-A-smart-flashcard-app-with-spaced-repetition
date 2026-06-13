import { Router } from "express";

import { getDecks, getDeck, createDeck, deleteDeck } from "./deck.controller.js";
import { asyncHandler }from "../../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getDecks));
router.get("/:id", asyncHandler(getDeck));

router.post("/", asyncHandler(createDeck));
router.delete("/:id", asyncHandler(deleteDeck));

export default router;
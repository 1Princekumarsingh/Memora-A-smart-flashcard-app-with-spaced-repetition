import { Router } from "express";

import { deleteCard } from "./card.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.delete("/:cardId",asyncHandler(deleteCard));

export default router;
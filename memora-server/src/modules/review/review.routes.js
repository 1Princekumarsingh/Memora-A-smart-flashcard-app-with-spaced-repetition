import { Router } from "express";

import { submitReview } from "./review.controller.js";

import { validate }from "../../middleware/validate.js";
import { asyncHandler }from "../../utils/asyncHandler.js";
import { createReviewSchema }from "./review.schema.js";

const router = Router();

router.post("/", validate(createReviewSchema), asyncHandler(submitReview));

export default router;
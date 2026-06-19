import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getStats, getHeatmap } from "./stats.controller.js";

const router = Router();

router.get("/", asyncHandler(getStats));
router.get("/heatmap", asyncHandler(getHeatmap));

export default router;
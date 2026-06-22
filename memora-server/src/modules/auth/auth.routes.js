import { Router } from "express";

import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import { signupSchema, loginSchema, refreshSchema } from "./auth.schema.js";
import { signup, login, refresh, logout } from "./auth.controller.js";

const router = Router();

router.post("/signup", validate(signupSchema) ,asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/refresh", validate(refreshSchema), asyncHandler(refresh))
router.post("/logout", asyncHandler(logout))

export default router;
import { Router } from "express";

import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

import { signupSchema, loginSchema } from "./auth.schema.js";
import { signup, login} from "./auth.controller.js";

const router = Router();

router.post("/signup", validate(signupSchema) ,asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));

export default router;
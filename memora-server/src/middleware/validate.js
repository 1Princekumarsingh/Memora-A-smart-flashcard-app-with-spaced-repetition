import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const validate = (schema) => async (req, res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError){
        return next(new AppError("Validation failed", 400));
      }
      next(error);
    }
  };

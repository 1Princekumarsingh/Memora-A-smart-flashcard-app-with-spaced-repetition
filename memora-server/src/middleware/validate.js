import { success, ZodError } from "zod";

export const validate =
  (schema) => async (req, res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError){
        return res.status(400).json({
          success: false,
          error: error.issues
        })
      }
      next(error);
    }
  };
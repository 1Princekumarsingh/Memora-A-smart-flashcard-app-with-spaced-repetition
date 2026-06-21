import { prisma } from "../config/prisma.js";

import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
         return next(new AppError("Authentication required", 401))
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
        where: {
            id: payload.id
        }
    })

    if(!user){
        return next(
            new AppError("User not found", 401)
        )
    }

    req.user = user //now controllers can do req.user.id without touching JWT
    next()
}
    
       

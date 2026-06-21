import bcrypt from "bcryptjs";

import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { signAccessToken } from "../../utils/jwt.js";

//signup
export const signup = async({email, password}) =>{
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser){
        throw new AppError("Email Already Exists", 409);
    }

    const passwordHash = await bcrypt.hash(password,12);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash
        }
    })

    const token = signAccessToken({id: user.id});

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.passwordHash;

    return {token, user: userWithoutPassword}
}


//login
export const login = async ({email, password}) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(!user){
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = signAccessToken({id: user.id})

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.passwordHash;

    return {token, user: userWithoutPassword}
}
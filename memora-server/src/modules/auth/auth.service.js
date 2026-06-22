import bcrypt from "bcryptjs";

import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "../../utils/jwt.js";

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

    const accessToken = signAccessToken({id: user.id});
    const refreshToken = signRefreshToken({id: user.id});

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,

            expiresAt: new Date(
                Date.now() + 7*24*60*60*1000
            )
        }
    })

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.passwordHash;

    return {accessToken, refreshToken, user: userWithoutPassword}
}

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

    const accessToken = signAccessToken({id: user.id})
    const refreshToken = signRefreshToken({id: user.id})

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,

            expiresAt: new Date(
                Date.now() + 7*24*60*60*1000
            )
        }
    })

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.passwordHash;

    return {accessToken, refreshToken, user: userWithoutPassword}
}

export const refresh = async(refreshToken) => {
    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken
        }
    }) 

    if(!storedToken){
        throw new AppError("Invalid refresh token", 401)
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = signAccessToken({
        id: payload.id
    })

    //refresh roation
    await prisma.refreshToken.delete({
        where: {
            token: refreshToken
        }
    })

    const newRefreshToken = signRefreshToken({id: payload.id})

    await prisma.refreshToken.create({
        data: {
            token: newRefreshToken,
            userId: payload.id,

            expiresAt: new Date(Date.now() + 7*24*60*60*1000)
        }
    })

    return {accessToken, refreshToken: newRefreshToken}
}

export const logout = async(refreshToken) => {
    await prisma.refreshToken.deleteMany({
        where: {
            token: refreshToken
        }
    })

    return true;
}
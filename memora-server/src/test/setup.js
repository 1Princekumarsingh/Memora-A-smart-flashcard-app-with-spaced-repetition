import { afterAll, beforeEach } from "vitest";
import { prisma } from "../config/prisma.js";
import { redis } from "../config/redis.js";

beforeEach(async () => {
    await prisma.review.deleteMany();
    await prisma.card.deleteMany();
    await prisma.deck.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();

    if(redis?.flushdb){
        await redis.flushdb()
    }
})

afterAll(async () => {
    await prisma.$disconnect()

    if(redis?.quit){
        await redis.quit()
    }
})

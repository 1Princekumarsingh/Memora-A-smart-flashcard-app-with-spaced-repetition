import Redis from "ioredis";

import { env } from "./env.js";

export const redis = new Redis(env.REDIS_URL, {
    connectTimeout: 1000,
    maxRetriesPerRequest: 1,
});

redis.on("connect", () => {
    console.log("Redis connected")
})
redis.on("error", (error) => {
    console.log("Redis error: ", error)
})

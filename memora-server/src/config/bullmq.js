import IOredis from "ioredis"
import { env } from "./env.js" 

export const bullmqConnection = env.NODE_ENV === "test"
    ? null
    : new IOredis(
    env.REDIS_URL,
    {
        maxRetriesPerRequest: null
    }
) 

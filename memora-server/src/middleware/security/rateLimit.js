import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redis } from "../../config/redis.js";
import { API_RATE_LIMIT, AUTH_RATE_LIMIT } from "../../config/security.js";
import { NODE_ENV } from "../../config/env.js";

const makeRedisStore = (prefix) =>
    new RedisStore({
        prefix,
        sendCommand: (...args) => redis.call(...args),
    });

const skipInTest = () => NODE_ENV === "test" && process.env.ENABLE_RATE_LIMIT_TESTS !== "true";
const storeFor = (prefix) => NODE_ENV === "test" ? undefined : makeRedisStore(prefix);

// global api limiter
export const apiLimiter = rateLimit({
    ...API_RATE_LIMIT,
    standardHeaders: "draft-6",
    legacyHeaders: true,
    skip: skipInTest,
    store: storeFor("rl:api:"),

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests"
        })
    }
})

// auth limiter
export const authLimiter = rateLimit({
    ...AUTH_RATE_LIMIT,
    standardHeaders: "draft-6",
    legacyHeaders: true,
    skip: skipInTest,
    store: storeFor("rl:auth:"),

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login attempts"
        })
    }
})

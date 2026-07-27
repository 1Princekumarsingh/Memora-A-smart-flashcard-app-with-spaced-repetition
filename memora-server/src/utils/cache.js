import { redis } from "../config/redis.js"

export async function getCache(key) {
    if (!redis) {
        return null;
    }

    const cached = await redis.get(key);

    if(!cached){
        return null
    }

    return JSON.parse(cached)
}

export async function setCache(key, value, ttl=300) {
    if (!redis) {
        return;
    }

    await redis.set(
        key,
        JSON.stringify(value),
        "EX",
        ttl
    )
}

export async function deleteCache(...keys){
    if (!redis) {
        return;
    }

    if(keys.length > 0){
        await redis.del(...keys)
    }
}

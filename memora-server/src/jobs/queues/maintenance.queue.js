import { Queue } from "bullmq";
import { bullmqConnection } from "../../config/bullmq.js";

export const maintenanceQueue = bullmqConnection
    ? new Queue("maintenance", {
    connection: bullmqConnection,

    defaultJobOptions: {
        attempts: 3,

        backoff: {
            type: "exponential",
            delay: 5000
        },

        removeOnComplete: {
            age: 60*60,
            count: 100
        },

        removeOnFail: {
            age: 24*60*60,
            count: 500
        }
    }
})
    : null

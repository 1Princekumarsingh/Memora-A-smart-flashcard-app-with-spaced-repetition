import { Worker } from "bullmq";
import { bullmqConnection } from "../../config/bullmq.js";
import { processMaintenanceJob } from "../processors/maintenance.processor.js";

export const maintenanceWorker = bullmqConnection
    ? new Worker("maintenance", async (job) => {
    console.log(`Processing job: ${job.name} (${job.id})`)
    return processMaintenanceJob(job);
},
{
    connection: bullmqConnection,
    concurrency: 2
})
    : null

// worker has now been created
// now attaching listeners to it
maintenanceWorker?.on("completed", (job, result) => {
    console.log(`Job completed: ${job.name} (${job.id})`, result)
})

maintenanceWorker?.on("failed", (job, error) => {
    console.error(`Job failed: ${job.name} (${job.id})`, error)
})

maintenanceWorker?.on("error", (error) => {
    console.error(`Maintenance worker error:`, error)
})

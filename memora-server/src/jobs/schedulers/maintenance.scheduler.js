import { maintenanceQueue } from "../queues/maintenance.queue.js";

export async function setupMaintenanceSchedulers() {
    if (!maintenanceQueue) {
        return
    }

    await maintenanceQueue.upsertJobScheduler(
        "cleanup-expired-refresh-tokens",
        {
            every: 60*60*1000
        },
        {
            name: "cleanup-expired-refresh-tokens",
            data: {}
        }
    )

    await maintenanceQueue.upsertJobScheduler(
        "daily-system-report",
        {
            every: 24*60*60*1000
        },
        {
            name: "daily-system-report",
            data: {}
        }
    )

    console.log("Maintenance job schedulers registered")
}

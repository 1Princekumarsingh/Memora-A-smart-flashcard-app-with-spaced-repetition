import { describe, expect, it } from "vitest";

describe("bullmq test environment integration", () => {
    it("does not create BullMQ queue or worker in test environment", async () => {

        // Import inside the test because these modules depend on NODE_ENV.
        const { bullmqConnection } = await import("./bullmq.js");
        const { maintenanceQueue } = await import("../jobs/queues/maintenance.queue.js");
        const { maintenanceWorker } = await import("../jobs/workers/maintenance.worker.js");
        const { setupMaintenanceSchedulers } = await import("../jobs/schedulers/maintenance.scheduler.js");

        expect(process.env.NODE_ENV).toBe("test")
        expect(bullmqConnection).toBeNull()
        expect(maintenanceQueue).toBeNull()
        expect(maintenanceWorker).toBeNull()

        await expect(setupMaintenanceSchedulers()).resolves.toBeUndefined();
    })
})

import { beforeEach, describe, it, expect, vi } from "vitest";
import { maintenanceQueue } from "../queues/maintenance.queue.js";
import { setupMaintenanceSchedulers } from "./maintenance.scheduler.js";

vi.mock("../queues/maintenance.queue.js", () => ({
    maintenanceQueue: {
        upsertJobScheduler: vi.fn()
    }
}))

describe("maintenance scheduler", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("registers maintenance job scheduler", async () => {
        await setupMaintenanceSchedulers()

        expect(maintenanceQueue.upsertJobScheduler).toHaveBeenCalledTimes(2)

        expect(maintenanceQueue.upsertJobScheduler).toHaveBeenCalledWith(
            "cleanup-expired-refresh-tokens",
            {
                every: 60*60*1000
            },
            {
                name: "cleanup-expired-refresh-tokens",
                data: {}
            }
        )

        expect(maintenanceQueue.upsertJobScheduler).toHaveBeenCalledWith(
            "daily-system-report",
            {
                every: 24*60*60*1000
            },
            {
                name: "daily-system-report",
                data: {}
            }
        )
    })
})
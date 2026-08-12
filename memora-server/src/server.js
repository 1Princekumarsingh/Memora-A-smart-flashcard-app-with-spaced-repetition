import app from './app.js';
import { env } from './config/env.js';
import { setupMaintenanceSchedulers } from './jobs/schedulers/maintenance.scheduler.js';
import { maintenanceWorker } from './jobs/workers/maintenance.worker.js';

const server = app.listen(env.PORT, async () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  
  await setupMaintenanceSchedulers();
  console.log("Maintenance worker started")
});

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down...`)

  await maintenanceWorker?.close()

  // only exit once the HTTP server has actually closed
  server.close(() => { // asynchronous in the sense that it waits for the server to finish closing existing connections
    console.log("HTTP server close")

    process.exit(0) // terminates the node.js process immediately
  })
}

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))

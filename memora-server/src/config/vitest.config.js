import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({path: ".env.test"});
process.env.NODE_ENV = "test";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        fileParallelism: false,

        include: ["src/**/*.test.js", "src/**/*.integration.test.js"],

        setupFiles: ["src/test/setup.js"],

        coverage: {
            provider: 'v8',
            reporter: ["text", "html"]
        }
    }
})

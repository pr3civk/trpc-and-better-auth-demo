import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { env } from "./utils/env"

export default defineConfig({
    schema: "./db/schema",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: env.server.DB_URL,
    },
})
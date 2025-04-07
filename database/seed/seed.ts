import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { env } from "../../app/env.server"
import { schema } from "../../app/schema"
import { seed as seedEthogram } from "./ethogram"

const client = postgres(env.DATABASE_URL)
const db = drizzle(client, { schema })

export type Transaction = Parameters<Parameters<(typeof db)["transaction"]>[0]>[0]
type TransactionOrDB = Transaction | typeof db

export type DB = TransactionOrDB
async function seed() {
  await db.transaction(async (tx) => {
    await seedEthogram(tx)
  })
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error)
    process.exit(1)
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...")
    process.exit(0)
  })

import { z } from "zod"

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string()
})

const envResult = schema.safeParse(process.env)

if (!envResult.success) {
  console.error(envResult.error.errors)
  throw new Error("Invalid environment variables")
}

export const env = envResult.data

import { Switch, Route } from "wouter"
import { Zero } from "@rocicorp/zero"
import { schema } from "./schema"
import { ZeroProvider } from "@rocicorp/zero/react"
import posthog from "posthog-js"
import { useEffect } from "react"
import { create } from "zustand"
import { Index } from "./routes/index/route"
import "./app.css"

function PosthogInit() {
  useEffect(() => {
    posthog.init("phc_QI5FO8rh3mwacv5T4e9A59zOmvxtim9B04hXhpkXL2B", {
      // api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      person_profiles: "always"
    })
  }, [])

  return null
}

type ZeroStore = {
  z: Zero<typeof schema> | null
  createZero: (userId: string) => void
}

const useZeroStore = create<ZeroStore>((set) => ({
  z: null,
  createZero: (userId: string) => {
    const newZ = new Zero({
      userID: userId,
      auth: () => undefined,
      server: import.meta.env.VITE_PUBLIC_SERVER,
      schema,
      kvStore: "idb"
    })
    set({ z: newZ })
  }
}))

export default function App() {
  const { z, createZero } = useZeroStore()

  useEffect(() => {
    // Initialize with guest user - you can change this as needed
    console.log("createZero")
    createZero("guest")
  }, [createZero]) // Only run once on mount

  if (!z) return null

  return (
    <>
      <ZeroProvider zero={z}>
          <Switch>
            <Route path="/">
              <Index />
            </Route>
          </Switch>
      </ZeroProvider>
      {import.meta.env.PROD && <PosthogInit />}
    </>
  )
}

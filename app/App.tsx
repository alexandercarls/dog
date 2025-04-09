import { Switch, Route } from "wouter"
import { Zero } from "@rocicorp/zero"
import { schema } from "./schema"
import { ZeroProvider } from "@rocicorp/zero/react"
import { Index } from "./routes/index/route"
import "./app.css"
import { useEffect } from "react"
import { create } from "zustand"

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

  if (!z) {
    return <div>Loading...</div>
  }

  return (
    <ZeroProvider zero={z}>
      <Switch>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </ZeroProvider>
  )
}

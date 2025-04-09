import { Switch, Route } from "wouter"
import { Zero } from "@rocicorp/zero"
import { schema } from "./schema"
import { ZeroProvider } from "@rocicorp/zero/react"
import { Index } from "./routes/index/route"
import "./app.css"

const z = new Zero({
  userID: "guest",
  auth: () => undefined,
  server: import.meta.env.VITE_PUBLIC_SERVER,
  schema,
  kvStore: "idb"
})

export default function App() {
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

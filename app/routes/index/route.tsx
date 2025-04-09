import { type FC } from "react"
import { useQuery, useZero } from "@rocicorp/zero/react"
import { Schema } from "../../schema"

export const Index: FC = () => {
  const z = useZero<Schema>()

  const [funktionskreise, { type }] = useQuery(
    z.query.funktionskreis.orderBy("order", "asc"),
    { ttl: "forever" }
  )

  console.log(funktionskreise, type)

  return (
    <>
      <div>Index</div>
      <button
        onClick={async () => {
          const inspector = await z.inspect()
          const client = inspector.client

          // All raw k/v data currently synced to client
          console.log("client map:")
          console.log(await client.map())
        }}
      >
        Inspector
      </button>
      <table>
        <thead>
          <tr>
            <th>Funktionskreis</th>
          </tr>
        </thead>
        <tbody>
          {funktionskreise.map((funktionskreis) => (
            <tr key={funktionskreis.name}>
              <td>
                {funktionskreis.id} {funktionskreis.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

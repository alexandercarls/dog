import { type FC } from "react"
import { useQuery, useZero } from "@rocicorp/zero/react"
import { Schema } from "../../schema"

export const Index: FC = () => {
  const z = useZero<Schema>()
  // const z = useZ()

  // console.log(z)
  const [funktionskreise, { type }] = useQuery(
    z.query.funktionskreis
      // .related("verhalten", (q) => q.orderBy("name", "asc"))
      .orderBy("order", "asc"),
    { ttl: "forever" }
  )
  // const [verhalten, { type }] = useQuery(
  //   z.query.verhalten
  //     .related("funktionskreis", (q) => q.orderBy("order", "asc"))
  // )

  console.log(funktionskreise, type)

  // if (type !== "complete") {
  //   return <div>Loading...</div>
  // }

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
      <pre>{/* {JSON.stringify(funktionskreise, null, 2)} */}</pre>
      <table>
        <thead>
          <tr>
            <th>Funktionskreis</th>
            {/* <th>Verhalten</th> */}
          </tr>
        </thead>
        <tbody>
          {funktionskreise.map((funktionskreis) => (
            // funktionskreis.verhalten.map((verhalten) => (
            <tr key={funktionskreis.name}>
              <td>
                {funktionskreis.id} {funktionskreis.name}
              </td>
              {/* <td>{verhalten.name}</td> */}
            </tr>
            // ))
          ))}
        </tbody>
      </table>
    </>
  )
}

import { type FC } from "react"
import { useQuery } from "@rocicorp/zero/react"
import { useZ } from "../../hooks/use-z"

export const Index: FC = () => {
  const z = useZ()

  const [funktionskreise, { type }] = useQuery(
    z.query.funktionskreis.related("verhalten", (q) => q.orderBy("name", "asc")),
    { ttl: "forever" }
  )

  console.log(funktionskreise, type)

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Funktionskreis</th>
            <th>Verhalten</th>
          </tr>
        </thead>
        <tbody>
          {funktionskreise.map((funktionskreis) =>
            funktionskreis.verhalten.map((verhalten) => (
              <tr key={verhalten.id}>
                <td>{funktionskreis.name}</td>
                <td>{verhalten.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

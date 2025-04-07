import { type FC } from "react"
import { useZ } from "../../hooks/use-z"
import { useQuery } from "@rocicorp/zero/react"

export const Index: FC = () => {
  const z = useZ()

  const [funktionskreise, { type }] = useQuery(
    z.query.funktionskreis
      .related("verhalten", (q) => q.orderBy("name", "asc"))
      .orderBy("order", "asc")
  )
  // const [verhalten, { type }] = useQuery(
  //   z.query.verhalten
  //     .related("funktionskreis", (q) => q.orderBy("order", "asc"))
  // )



  if (type !== "complete") {
    return <div>Loading...</div>
  }


  return (
    <>
      <div>Index</div>
      <table>
        <thead>
          <tr>
            <th>Funktionskreis</th>
            <th>Verhalten</th>
          </tr>
        </thead>
        <tbody>
          {funktionskreise.map((funktionskreis) => (
            funktionskreis.verhalten.map((verhalten) => (
              <tr key={verhalten.id}>
                <td>{funktionskreis.name}</td>
                <td>{verhalten.name}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </>
  )
}

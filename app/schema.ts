import {
  createSchema,
  definePermissions,
  number,
  string,
  table,
  type Row,
  PermissionsConfig,
  ANYONE_CAN_DO_ANYTHING,
  relationships
} from "@rocicorp/zero"

const funktionskreisTable = table("funktionskreis")
  .columns({
    id: string(),
    name: string(),
    order: number()
  })
  .primaryKey("id")

const verhaltenTable = table("verhalten")
  .columns({
    id: string(),
    name: string()
  })
  .primaryKey("id")

const kategorieTable = table("kategorie")
  .columns({
    id: string(),
    name: string()
  })
  .primaryKey("id")

const verhaltenFunktionskreisTable = table("verhaltenFunktionskreis")
  .columns({
    id: string(),
    funktionskreisId: string(),
    verhaltenId: string(),
    kategorieId: string().optional()
  })
  .primaryKey("id")

const funktionskreisRelationships = relationships(funktionskreisTable, ({ many }) => ({
  verhalten: many(
    {
      sourceField: ["id"],
      destSchema: verhaltenFunktionskreisTable,
      destField: ["funktionskreisId"]
    },
    {
      sourceField: ["verhaltenId"],
      destSchema: verhaltenTable,
      destField: ["id"]
    }
  )
}))

const verhaltenRelationships = relationships(verhaltenTable, ({ many }) => ({
  funktionskreis: many(
    {
      sourceField: ["id"],
      destSchema: verhaltenFunktionskreisTable,
      destField: ["verhaltenId"]
    },
    {
      sourceField: ["funktionskreisId"],
      destSchema: funktionskreisTable,
      destField: ["id"]
    }
  )
}))

export const schema = createSchema({
  tables: [
    funktionskreisTable,
    verhaltenTable,
    kategorieTable,
    verhaltenFunktionskreisTable
  ],
  relationships: [funktionskreisRelationships, verhaltenRelationships]
})

export type Schema = typeof schema
export type Funktionskreis = Row<typeof schema.tables.funktionskreis>
export type Verhalten = Row<typeof schema.tables.verhalten>
export type Kategorie = Row<typeof schema.tables.kategorie>

type AuthData = {
  sub: string | null
}

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  return {
    funktionskreis: ANYONE_CAN_DO_ANYTHING,
    verhalten: ANYONE_CAN_DO_ANYTHING,
    kategorie: ANYONE_CAN_DO_ANYTHING,
    verhaltenFunktionskreis: ANYONE_CAN_DO_ANYTHING
  } satisfies PermissionsConfig<AuthData, Schema>
})

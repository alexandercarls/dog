import {
  createSchema,
  definePermissions,
  number,
  relationships,
  string,
  table,
  type Row,
  ANYONE_CAN,
  PermissionsConfig
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

const funktionskreisRelationships = relationships(
  funktionskreisTable,
  ({ many }) => ({
    verhalten: many({
      sourceField: ["id"],
      destSchema: verhaltenFunktionskreisTable,
      destField: ["funktionskreisId"],
    }, {
      sourceField: ["verhaltenId"],
      destSchema: verhaltenTable,
      destField: ["id"],
    }),
  })
)

const verhaltenRelationships = relationships(
  verhaltenTable,
  ({ many }) => ({
    funktionskreis: many({
      sourceField: ["id"],
      destSchema: verhaltenFunktionskreisTable,
      destField: ["verhaltenId"],
    }, {
      sourceField: ["funktionskreisId"],
      destSchema: funktionskreisTable,
      destField: ["id"],
    }),
  })
)


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
    funktionskreis: {
      row: {
        select: ANYONE_CAN,
        insert: ANYONE_CAN,
        delete: ANYONE_CAN,
        update: {
          postMutation: ANYONE_CAN,
          preMutation: ANYONE_CAN
        }
      }
    },
    verhalten: {
      row: {
        select: ANYONE_CAN,
        insert: ANYONE_CAN,
        delete: ANYONE_CAN,
        update: {
          postMutation: ANYONE_CAN,
          preMutation: ANYONE_CAN
        }
      }
    },
    kategorie: {
      row: {
        select: ANYONE_CAN,
        insert: ANYONE_CAN,
        delete: ANYONE_CAN,
        update: {
          postMutation: ANYONE_CAN,
          preMutation: ANYONE_CAN
        }
      }
    },
    verhaltenFunktionskreis: {
      row: {
        select: ANYONE_CAN,
        insert: ANYONE_CAN,
        delete: ANYONE_CAN,
        update: {
          postMutation: ANYONE_CAN,
          preMutation: ANYONE_CAN
        }
      }
    }
  } satisfies PermissionsConfig<AuthData, Schema>
})

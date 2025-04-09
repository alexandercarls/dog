import {
  createSchema,
  definePermissions,
  number,
  string,
  table,
  type Row,
  PermissionsConfig,
  ANYONE_CAN_DO_ANYTHING
} from "@rocicorp/zero"

const funktionskreisTable = table("funktionskreis")
  .columns({
    id: string(),
    name: string(),
    order: number()
  })
  .primaryKey("id")

export const schema = createSchema({
  tables: [funktionskreisTable]
})

export type Schema = typeof schema
export type Funktionskreis = Row<typeof schema.tables.funktionskreis>

type AuthData = {
  sub: string | null
}

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  return {
    funktionskreis: ANYONE_CAN_DO_ANYTHING
  } satisfies PermissionsConfig<AuthData, Schema>
})

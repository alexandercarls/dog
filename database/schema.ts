import { sql } from "drizzle-orm"
import { pgTable as table } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"

export const funktionskreisTable = table("funktionskreis", {
  id: t.uuid().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull(),
  order: t.integer().notNull().default(0),
  createdAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull(),
  updatedAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull()
})

// Ein einzelnes Verhalten kann mehreren Funktionskreisen zugeordnet werden.
export const verhaltenTable = table("verhalten", {
  id: t.uuid().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull().unique(),
  createdAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull(),
  updatedAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull()
})

export const kategorieTable = table("kategorie", {
  id: t.uuid().primaryKey().notNull(),
  name: t.varchar({ length: 255 }).notNull().unique(),
  createdAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull(),
  updatedAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull()
})

export const verhaltenFunktionskreisTable = table("verhaltenFunktionskreis", {
  id: t.uuid().primaryKey().notNull(),
  funktionskreisId: t
    .uuid()
    .references(() => funktionskreisTable.id)
    .notNull(),
  verhaltenId: t
    .uuid()
    .references(() => verhaltenTable.id)
    .notNull(),
  kategorieId: t.uuid().references(() => kategorieTable.id),
  createdAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull(),
  updatedAt: t
    .timestamp()
    .default(sql`now()`)
    .notNull()
})

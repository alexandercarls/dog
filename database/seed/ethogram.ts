import { funktionskreisTable, verhaltenTable, verhaltenFunktionskreisTable, kategorieTable } from "../schema"
import type { DB } from "./seed"

type Fk = 'Komfortverhalten und Körperpflege' | 'Ausdrucksverhalten'

const funktionskreise: Record<Fk, string> = {
  "Komfortverhalten und Körperpflege": "",
  "Ausdrucksverhalten": "",
}

type Behaviour = {
  funktionskreis: Fk
  name: string
  kategorie?: string
}

const behaviours: Array<Behaviour> = [
  {
    funktionskreis: "Komfortverhalten und Körperpflege",
    name: "Objektkontaktschieben"
  },
  {
    funktionskreis: "Komfortverhalten und Körperpflege",
    name: "Kopfschlenkern"
  },
  {
    funktionskreis: "Ausdrucksverhalten",
    name: "Voll-Zähneblecken"
  },
  {
    funktionskreis: "Ausdrucksverhalten",
    name: "Hockerstellung",
    kategorie: "Bein, Kopf- und Körperhaltung"
  },
]

export const seed = async (db: DB) => {
  // Create funktionskreise and store their IDs
  const funktionskreiseIds: Record<Fk, string> = {
    "Komfortverhalten und Körperpflege": "",
    "Ausdrucksverhalten": ""
  }
  const insertData = Object.keys(funktionskreise).map((name, index) => ({
    id: crypto.randomUUID(),
    name: name,
    order: index,
  }))
  for (const data of insertData) {
    const b = await db.insert(funktionskreisTable).values(data).returning({ id: funktionskreisTable.id })
    funktionskreiseIds[data.name] = b[0].id
  }

  // Create behaviours and store their IDs
  const behaviourIds: Record<string, string> = {}
  for (const behaviour of behaviours) {
    const result = await db.insert(verhaltenTable).values({
      id: crypto.randomUUID(),
      name: behaviour.name,
    }).returning({ id: verhaltenTable.id })
    behaviourIds[behaviour.name] = result[0].id
  }
  
  const kategorienIds: Record<string, string> = {}
  const uniqueCategories = new Set<string>(behaviours.map(b => b.kategorie).filter(k => k !== undefined))
  for (const category of uniqueCategories) {
    const result = await db.insert(kategorieTable).values({
      id: crypto.randomUUID(),
      name: category,
    }).onConflictDoNothing().returning({ id: kategorieTable.id })
    kategorienIds[category] = result[0].id
  }

  // Create funktionskreis-behaviour associations
  for (const behaviour of behaviours) {
    await db.insert(verhaltenFunktionskreisTable).values({
      id: crypto.randomUUID(),
      funktionskreisId: funktionskreiseIds[behaviour.funktionskreis],
      verhaltenId: behaviourIds[behaviour.name],
      kategorieId: behaviour.kategorie ? kategorienIds[behaviour.kategorie] : null
    })
  }
}

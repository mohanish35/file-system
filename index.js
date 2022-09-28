import DatabaseConnection from "./db/index.js"
import FileSystem from "./FileSystem.js"

let db = null
const setup = async () => {
  const dbConnectionPromise = new DatabaseConnection().connection

  try {
    db = await dbConnectionPromise
    await db.migrate()
  } catch (err) {
    throw new Error(err)
  }
}

await setup()

const fileSystem = new FileSystem(db)

// console.log(await fileSystem.scan("/"))

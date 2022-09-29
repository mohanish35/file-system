import DatabaseConnection from "./src/DatabaseConnection.js"
import FileSystem from "./src/FileSystem.js"
import runTests from './__tests__/index.js'

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

await runTests(fileSystem)

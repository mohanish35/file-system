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

console.log(await fileSystem.create('/', "FOLDER"))
console.log(await fileSystem.create('/Avengers', "FOLDER"))
console.log(await fileSystem.create('/Avengers/Tony Stark.txt', "FILE"))
console.log(await fileSystem.write('/Avengers/Tony Stark', 'I am Iron Man'))
console.log(await fileSystem.read('/Avengers/Tony Stark'))
console.log(await fileSystem.scan("/"))

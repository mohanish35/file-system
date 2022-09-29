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

// console.log(await fileSystem.create("/Heroes", "FOLDER"))
// console.log(await fileSystem.create("/Heroes/Avengers", "FOLDER"))
// console.log(await fileSystem.create("/Heroes/Avengers/Tony Stark.txt", "FILE"))
// console.log(await fileSystem.ctime("/Heroes/Avengers/Tony Stark.txt"))
// console.log(await fileSystem.mtime("/Heroes/Avengers/Tony Stark.txt"))
// console.log(
//   await fileSystem.write("/Heroes/Avengers/Tony Stark.txt", "I am Iron Man")
// )
// console.log(await fileSystem.read("/Heroes/Avengers/Tony Stark.txt"))
// console.log(
//   await fileSystem.write("/Heroes/Avengers/Tony Stark.txt", "I am Tony Stark")
// )
// console.log(await fileSystem.mtime("/Heroes/Avengers/Tony Stark.txt"))
// console.log(await fileSystem.create("/Heroes/GOTG", "FOLDER"))
// console.log(await fileSystem.create("/Heroes/GOTG/Groot.txt", "FILE"))
// console.log(await fileSystem.write("/Heroes/GOTG/Groot.txt", "I am Groot!"))
// console.log(await fileSystem.read("/Heroes/GOTG/Groot.txt"))
// console.log(await fileSystem.scan("/Heroes"))

// console.log(await fileSystem.rename('/Heroes/GOTG/Groot2.txt', 'Groot.txt'))
// console.log(await fileSystem.scan("/Heroes/GOTG"))
// console.log(await fileSystem.scan("/Heroes/Avengers"))
// console.log(await fileSystem.move('/Heroes/GOTG/Groot.txt', '/Heroes'))

// console.log(await fileSystem.rename("/Heroes/Groot2.txt", "Groot2.txt"))
// console.log(await fileSystem.delete("/Heroes/Dead Avengers"))

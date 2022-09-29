
export default async (fileSystem) => {
  // CREATE
  // console.log(await fileSystem.create("/Heroes", "FOLDER"))
  // console.log(await fileSystem.create("/Heroes/Avengers", "FOLDER"))
  // console.log(await fileSystem.create("/Heroes/Avengers/Tony Stark.txt", "FILE"))

  // CTIME
  // console.log(await fileSystem.ctime("/Heroes/Avengers/Tony Stark.txt"))

  // MTIME
  // console.log(await fileSystem.mtime("/Heroes/Avengers/Tony Stark.txt"))

  // WRITE
  // console.log(
  //   await fileSystem.write("/Heroes/Avengers/Tony Stark.txt", "I am Iron Man")
  // )

  // READ
  // console.log(await fileSystem.read("/Heroes/Avengers/Tony Stark.txt"))

  // WRITE
  // console.log(
  //   await fileSystem.write("/Heroes/Avengers/Tony Stark.txt", "I am Tony Stark")
  // )

  // MTIME
  // console.log(await fileSystem.mtime("/Heroes/Avengers/Tony Stark.txt"))

  // CREATE
  // console.log(await fileSystem.create("/Heroes/GOTG", "FOLDER"))
  // console.log(await fileSystem.create("/Heroes/GOTG/Groot.txt", "FILE"))

  // WRITE
  // console.log(await fileSystem.write("/Heroes/GOTG/Groot.txt", "I am Groot!"))

  // READ
  // console.log(await fileSystem.read("/Heroes/GOTG/Groot.txt"))

  // SCAN
  // console.log(await fileSystem.scan("/Heroes"))

  // RENAME
  // console.log(await fileSystem.rename('/Heroes/GOTG/Groot.txt', 'Groot2.txt'))

  // SCAN
  // console.log(await fileSystem.scan("/Heroes/GOTG"))
  // console.log(await fileSystem.scan("/Heroes/Avengers"))

  // MOVE
  // console.log(await fileSystem.move('/Heroes/GOTG/Groot2.txt', '/Heroes'))

  // SCAN
  // console.log(await fileSystem.scan("/Heroes"))
  // console.log(await fileSystem.scan("/Heroes/GOTG"))

  // DELETE
  // console.log(await fileSystem.delete("/Heroes/Avengers"))
}

export default async ({ create, ctime, mtime, write, read, scan, rename, move, delete: deleteElement }) => {
  // CREATE
  // console.log(await create("/Heroes", "FOLDER"))
  // console.log(await create("/Heroes/Avengers", "FOLDER"))
  // console.log(await create("/Heroes/Avengers/Tony Stark.txt", "FILE"))

  // CTIME
  // console.log(await ctime("/Heroes/Avengers/Tony Stark.txt"))

  // MTIME
  // console.log(await mtime("/Heroes/Avengers/Tony Stark.txt"))

  // WRITE
  // console.log(
  //   await write("/Heroes/Avengers/Tony Stark.txt", "I am Iron Man")
  // )

  // READ
  // console.log(await read("/Heroes/Avengers/Tony Stark.txt"))

  // WRITE
  // console.log(
  //   await write("/Heroes/Avengers/Tony Stark.txt", "I am Tony Stark")
  // )

  // MTIME
  // console.log(await mtime("/Heroes/Avengers/Tony Stark.txt"))

  // CREATE
  // console.log(await create("/Heroes/GOTG", "FOLDER"))
  // console.log(await create("/Heroes/GOTG/Groot.txt", "FILE"))

  // WRITE
  // console.log(await write("/Heroes/GOTG/Groot.txt", "I am Groot!"))

  // READ
  // console.log(await read("/Heroes/GOTG/Groot.txt"))

  // SCAN
  // console.log(await scan("/Heroes"))

  // RENAME
  // console.log(await rename('/Heroes/GOTG/Groot.txt', 'Groot2.txt'))

  // SCAN
  // console.log(await scan("/Heroes/GOTG"))
  // console.log(await scan("/Heroes/Avengers"))

  // MOVE
  // console.log(await move('/Heroes/GOTG/Groot2.txt', '/Heroes'))

  // SCAN
  // console.log(await scan("/Heroes"))
  // console.log(await scan("/Heroes/GOTG"))

  // DELETE
  // console.log(await deleteElement("/Heroes/Avengers"))

  // MOVE
  // console.log(await move("/Heroes/Groot2.txt", "/Heroes/GOTG/"))

  // RENAME
  // console.log(await rename("/Heroes/GOTG/Groot2.txt", "Groot.txt"))
}

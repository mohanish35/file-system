import { sqlQueries, keywords } from "./constant/index.js"

class Validator {
  constructor(db) {
    this.db = db
  }

  async folderPathValidator(path) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [path, keywords.folder]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid Folder Path: ${path}`)
    }
  }

  async filePathValidator(path) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [path, keywords.file]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid Folder Path: ${path}`)
    }
  }
}

export default Validator
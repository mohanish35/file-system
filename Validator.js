import { sqlQueries, keywords } from "./constant/index.js"

class Validator {
  constructor(db) {
    this.db = db
  }

  pathResolution

  pathValidator() {

  }

  async validateFolderPathExists(path) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [path, keywords.folder]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Folder Path Does Not Exists: ${path}`)
    }
  }

  async validateFilePathExists(path) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [path, keywords.file]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid File Path: ${path}`)
    }
  }

  async validateElementPathExists(path) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPath,
      [path]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid Element Path: ${path}`)
    }
  }
}

export default Validator

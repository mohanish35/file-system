import { sqlQueries } from "./constant/index.js"
import Validator from "./Validator.js"

class FileSystem {
  constructor(db) {
    this.db = db
    this.validator = new Validator(db)
  }
  async scan(dirPath) {
    await this.validator.folderPathValidator(dirPath)

    const records = await this.db.all(
      sqlQueries.getChildrenNameFromParentPath,
      [dirPath]
    )

    return records.map((record) => record.name)
  }
}

export default FileSystem

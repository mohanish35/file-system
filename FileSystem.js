import { sqlQueries } from "./constant/index.js"
import Validator from "./Validator.js"
import DateHelper from "./DateHelper.js"

class FileSystem {
  constructor(db) {
    this.db = db
    this.validator = new Validator(db)
    this.dateHelper = new DateHelper()
  }
  async scan(directoyPath) {
    await this.validator.validateFolderPathExists(directoyPath)

    const records = await this.db.all(
      sqlQueries.getChildrenNameFromParentPath,
      [directoyPath]
    )

    return records.map((record) => record.name)
  }
  async create(elementPath, elementType) {
    try {
      let parentPath = ""
      let name = ""
      const splittedPath = elementPath.split("/")
      const todaysDate = this.dateHelper.getTodaysDateFormatted()

      // Creating root directory
      if (elementPath === "/") {
        parentPath = null
        name = "/"
        // Creating the element in the root directory
      } else if (splittedPath.length === 2) {
        parentPath = "/"
        name = splittedPath[splittedPath.length - 1]
      } else {
        parentPath = splittedPath.slice(0, splittedPath.length - 1).join("/")
        name = splittedPath[splittedPath.length - 1]
      }

      // Validate if the parent folder exists
      if (parentPath) {
        await this.validator.validateFolderPathExists(parentPath)
      }

      await this.db.all(sqlQueries.createElement, [
        name,
        elementPath,
        parentPath,
        "",
        elementType,
        todaysDate,
        todaysDate,
      ])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default FileSystem

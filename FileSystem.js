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
    try {
      await this.validator.validateFolderPathExists(directoyPath)

      const records = await this.db.all(
        sqlQueries.getChildrenNameFromParentPath,
        [directoyPath]
      )

      return records.map((record) => record.name)
    } catch(error) {
      console.error(error)
    }
  }
  async create(elementPath, elementType) {
    try {
      let parentPath = ""
      let name = ""
      const splittedPath = elementPath.split("/")
      const timestamp = this.dateHelper.getCurrentUnixTimestamp()

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
        timestamp,
        timestamp,
      ])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  async read(filePath) {
    try {
      // No need to validate filePath because record[0].content throws error
      const record = await this.db.all(
        sqlQueries.readFileFromPath,
        [filePath]
      )

      return record[0].content
    } catch (error) {
      console.error(error)
      return null
    }
  }
  async write(filePath, stringContent) {
    try {
      await this.validator.validateFilePathExists(filePath)
      const timestamp = this.dateHelper.getCurrentUnixTimestamp()
      await this.db.all(sqlQueries.updateFileContent, [stringContent, timestamp, filePath])

      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }
  async rename(elementPath, newName) {
    try {
      await this.validator.validateElementPathExists(elementPath)
      
      if (elementPath === '/') {
        throw new Error('Cannot Rename Root Directory')
      }

      const oldPathSplitted = elementPath.split('/')
      const newPathSplitted = oldPathSplitted
      newPathSplitted[newPathSplitted.length - 1] = newName
      const newPath = newPathSplitted.join('/')

      await this.db.all("UPDATE Element SET path = REPLACE(path, ?, ?), parent_path = REPLACE(parent_path, ?, ?);", [elementPath, newPath, elementPath, newPath])

      return true

    } catch (error) {
      console.error(error)
      return false
    }
  }
  async delete(elementPath) {
    try {
      await this.validator.validateElementPathExists(elementPath)

      await this.db.all(sqlQueries.deleteRecursively, [`${elementPath}%`])

      return true
    } catch(error) {
      console.error(error)
      return false
    }
  }
  async ctime(filePath) {
    try {
      // No need to validate filePath because record[0].created_at throws error
      const record = await this.db.all(
        sqlQueries.readFileFromPath,
        [filePath]
      )

      return record[0].created_at
    } catch (error) {
      console.error(error)
      return -1
    }
  }
  async mtime(filePath) {
    try {
      // No need to validate filePath because record[0].modified_at throws error
      const record = await this.db.all(
        sqlQueries.readFileFromPath,
        [filePath]
      )

      return record[0].modified_at
    } catch (error) {
      console.error(error)
      return -1
    }
  }
}

export default FileSystem

import { keywords, sqlQueries } from "../constant/index.js"
import PathUtility from "./util/PathUtility.js"
import DateHelper from "./helper/DateHelper.js"

class FileSystem {
  constructor(db) {
    this.db = db
    this.pathUtility = new PathUtility(db)
    this.dateHelper = new DateHelper()
  }
  scan = async (directoyPath) => {
    try {
      directoyPath = this.pathUtility.resolvePath(directoyPath)
      await this.pathUtility.validateFolderPathExists(directoyPath)

      const records = await this.db.all(
        sqlQueries.getChildrenNameFromParentPath,
        [directoyPath]
      )

      return records.map((record) => record.name)
    } catch (error) {
      console.error(error)
    }
  }
  create = async (elementPath, elementType) => {
    try {
      elementPath = this.pathUtility.resolvePath(elementPath)

      let parentPath = ""
      let name = ""
      const splittedPath = elementPath.split("/")
      const timestamp = this.dateHelper.getCurrentUnixTimestamp()

      // Creating root directory
      if (elementPath === "/") {
        parentPath = null
        name = "/"
        // Creating an element in the root directory
      } else if (splittedPath.length === 2) {
        parentPath = "/"
        name = splittedPath[splittedPath.length - 1]
      } else {
        parentPath = splittedPath.slice(0, splittedPath.length - 1).join("/")
        name = splittedPath[splittedPath.length - 1]
      }

      if (parentPath) {
        await this.pathUtility.validateFolderPathExists(parentPath)
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
  read = async (filePath) => {
    try {
      filePath = this.pathUtility.resolvePath(filePath)

      const record = await this.db.all(sqlQueries.readElementFromPath, [
        filePath,
      ])

      return record[0].content
    } catch (error) {
      console.error(error)
      return null
    }
  }
  write = async (filePath, stringContent) => {
    try {
      filePath = this.pathUtility.resolvePath(filePath)

      await this.pathUtility.validateFilePathExists(filePath)
      const timestamp = this.dateHelper.getCurrentUnixTimestamp()
      await this.db.all(sqlQueries.updateFileContent, [
        stringContent,
        timestamp,
        filePath,
      ])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  move = async (elementPath, directoryPath) => {
    try {
      elementPath = this.pathUtility.resolvePath(elementPath)
      directoryPath = this.pathUtility.resolvePath(directoryPath)

      if (elementPath === "/") throw new Error("Cannot Move Root Folder!")

      await this.pathUtility.validateFolderPathExists(directoryPath)

      const oldParentSplitted = elementPath.split('/')
      oldParentSplitted.splice(-1)
      const oldParent = oldParentSplitted.join('/')
      const record = await this.db.all(sqlQueries.readElementFromPath, [
        elementPath,
      ])

      if (
        record[0].element_type === keywords.folder &&
        directoryPath.startsWith(elementPath)
      ) {
        throw new Error("Cannot move a folder to its sub-folder!")
      }

      await this.db.all(sqlQueries.moveElement, [
        oldParent,
        directoryPath,
        oldParent,
        directoryPath,
        `${elementPath}%`
      ])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  rename = async (elementPath, newName) => {
    try {
      elementPath = this.pathUtility.resolvePath(elementPath)
      await this.pathUtility.validateElementPathExists(elementPath)

      if (elementPath === "/") {
        throw new Error("Cannot Rename Root Directory")
      }

      const oldPathSplitted = elementPath.split("/")
      const newPathSplitted = oldPathSplitted
      newPathSplitted[newPathSplitted.length - 1] = newName
      const newPath = newPathSplitted.join("/")

      await this.db.all(sqlQueries.moveElement, [
        elementPath,
        newPath,
        elementPath,
        newPath,
        `${elementPath}%`,
      ])

      // Update name
      await this.db.all(sqlQueries.updateNameFromPath, [newName, newPath])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  delete = async (elementPath) => {
    try {
      elementPath = this.pathUtility.resolvePath(elementPath)
      await this.pathUtility.validateElementPathExists(elementPath)

      await this.db.all(sqlQueries.deleteRecursively, [`${elementPath}%`])

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
  ctime = async (filePath) => {
    try {
      filePath = this.pathUtility.resolvePath(filePath)

      const record = await this.db.all(sqlQueries.readElementFromPath, [
        filePath,
      ])

      return record[0].created_at
    } catch (error) {
      console.error(error)
      return -1
    }
  }
  mtime = async (filePath) => {
    try {
      filePath = this.pathUtility.resolvePath(filePath)

      const record = await this.db.all(sqlQueries.readElementFromPath, [
        filePath,
      ])

      return record[0].modified_at
    } catch (error) {
      console.error(error)
      return -1
    }
  }
}

export default FileSystem

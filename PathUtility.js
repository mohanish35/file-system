import { sqlQueries, keywords } from "./constant/index.js"
import path from 'path'

class PathUtility {
  constructor(db) {
    this.db = db
  }

  resolvePath(elementPath) {
    if (elementPath[0] !== '/') throw new Error(`Invalid Path: ${elementPath}`)

    return path.resolve(elementPath)
  }

  async validateFolderPathExists(folderPath) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [folderPath, keywords.folder]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Folder Path Does Not Exists: ${folderPath}`)
    }
  }

  async validateFilePathExists(filePath) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPathAndType,
      [filePath, keywords.file]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid File Path: ${filePath}`)
    }
  }

  async validateElementPathExists(elementPath) {
    const recordCount = await this.db.all(
      sqlQueries.getElementCountFromPath,
      [elementPath]
    )

    if (recordCount[0]["count()"] !== 1) {
      throw new Error(`Invalid Element Path: ${elementPath}`)
    }
  }
}

export default PathUtility

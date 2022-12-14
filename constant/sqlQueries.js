const getChildrenNameFromParentPath =
  "SELECT name FROM Element WHERE parent_path=?;"
const getElementCountFromPathAndType =
  "SELECT count() FROM Element WHERE path=? AND element_type=?"
const getElementCountFromPath = "SELECT count() FROM Element WHERE path=?;"
const createElement =
  "INSERT INTO Element (name, path, parent_path, content, element_type, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
const readElementFromPath = "SELECT * FROM Element WHERE path=?;"
const updateFileContent =
  "UPDATE Element SET content = ?, modified_at = ? WHERE path=?;"
const deleteRecursively = "DELETE FROM Element WHERE path Like ?;"
const moveElement =
  "UPDATE Element SET path = REPLACE(path, ?, ?), parent_path = REPLACE(parent_path, ?, ?) WHERE path Like ?;"
const updateNameFromPath = "Update Element SET name = ? WHERE path = ?;"

export default {
  getChildrenNameFromParentPath,
  getElementCountFromPathAndType,
  createElement,
  readElementFromPath,
  updateFileContent,
  getElementCountFromPath,
  deleteRecursively,
  moveElement,
  updateNameFromPath
}

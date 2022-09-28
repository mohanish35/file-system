const getChildrenNameFromParentPath =
  "SELECT name FROM Element WHERE parent_path=?;"
const getElementCountFromPathAndType =
  "SELECT count() FROM Element WHERE path=? AND element_type=?"
const createElement =
  "INSERT INTO Element (name, path, parent_path, content, element_type, created_at, modified_at) VALUES (?, ?, ?, ?, ?, ?, ?)"

export default {
  getChildrenNameFromParentPath,
  getElementCountFromPathAndType,
  createElement
}

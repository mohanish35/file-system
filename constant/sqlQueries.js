const getChildrenNameFromParentPath =
  "SELECT name FROM Element WHERE parent_path=?;"
const getElementCountFromPathAndType =
  "SELECT count() FROM Element WHERE path=? AND element_type=?"

export default {
  getChildrenNameFromParentPath,
  getElementCountFromPathAndType,
}

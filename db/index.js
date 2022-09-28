import sqlite3 from "sqlite3"
import { open } from "sqlite"

class DatabaseConnection {
  constructor() {
    this.connection = open({
      filename: "data.db",
      driver: sqlite3.Database,
    })
  }
}

export default DatabaseConnection

CREATE TABLE IF NOT EXISTS Element (
  id INTEGER PRIMARY KEY,
  name TEXT,
  path TEXT UNIQUE,
  parent_path TEXT,
  content TEXT,
  element_type TEXT CHECK( element_type IN ('FILE', 'FOLDER')) NOT NULL,
  createdAt TEXT NOT NULL,
  modifiedAt TEXT NOT NULL
);

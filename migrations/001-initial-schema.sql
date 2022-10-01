-- CREATE Element Table

CREATE TABLE IF NOT EXISTS Element (
  id INTEGER PRIMARY KEY,
  name TEXT,
  path TEXT UNIQUE,
  parent_path TEXT,
  content TEXT,
  element_type TEXT CHECK( element_type IN ('FILE', 'FOLDER')) NOT NULL,
  created_at INTEGER NOT NULL,
  modified_at INTEGER NOT NULL
);

INSERT INTO Element (
  name, 
  path, 
  element_type, 
  created_at, 
  modified_at
) VALUES (
  '/', 
  '/', 
  'FOLDER',
  CAST((julianday('now') - 2440587.5)*86400.0 * 1000 as INTEGER),
  CAST((julianday('now') - 2440587.5)*86400.0 * 1000 as INTEGER)
)

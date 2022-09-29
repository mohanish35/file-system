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

-- Insert Root Directory TODO: fix time

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
  strftime('%ms', 'now'), 
  strftime('%ms', 'now')
)

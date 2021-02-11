var sqlite3 = require("sqlite3").verbose();
let testRole1 = `'"SR_1","SR_2"'`;
let testRole2 = `'"SR_1","SR_2","SF_1"'`;
let db = new sqlite3.Database("userDB.sqlite3", (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
});

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS User (Steam_ID TEXT PRIMARY KEY UNIQUE NOT NULL, Game_Role TEXT)"
  );
});

// Will throw error "Unique Constraint" if database already initialized, fine for testing.
db.serialize(function () {
  db.run(`INSERT INTO User VALUES (12345678, ${testRole1})`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  db.run(`INSERT INTO User VALUES (123456789, ${testRole2})`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

module.exports = db;

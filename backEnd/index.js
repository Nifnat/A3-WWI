const express = require("express");
var api = express();
var cors = require("cors");
var db = require("./dbinit.js");
var bodyParser = require("body-parser");
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cors());

api.get("/", function (req, res) {
  res.send("Hello World!");
});

api.get("/users", (req, res) => {
  const sql = "SELECT Steam_ID FROM User";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ Steam_IDs: rows });
  });
});

api.get("/roles", (req, res) => {
  const sql = "SELECT * FROM User";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ roles: rows });
  });
});

api.get("/role/:id?", (req, res) => {
  var errors = [];
  const steamID = req.params.id;
  if (!steamID) {
    errors.push("No SteamID specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "SELECT Game_Role FROM User WHERE Steam_ID = ?";
  db.get(sql, steamID, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.status(200).send({ role: row });
    } else {
      res.status(500).send();
    }
  });
});

// Returns a string of the roles only
api.get("/srole/:id?", (req, res) => {
  var errors = [];
  const steamID = req.params.id;
  if (!steamID) {
    errors.push("No SteamID specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "SELECT Game_Role FROM User WHERE Steam_ID = ?";
  db.get(sql, steamID, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    if (row) {
      res.status(200).send("[" + row["Game_Role"] + "]");
    } else {
      res.status(200).send();
    }
  });
});

api.post("/role", (req, res) => {
  var errors = [];
  if (!req.body.SteamID) {
    errors.push("No SteamID specified");
  }
  if (!req.body.GameRole) {
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    SteamID: req.body.SteamID,
    GameRole: req.body.GameRole,
  };
  const sql = "INSERT INTO user (Steam_ID, Game_Role) VALUES (?,?)";
  const params = [data.SteamID, data.GameRole];
  db.run(sql, params, (err) => {
    if (err) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.redirect("/roles");
  });
});

api.patch("/role", (req, res, next) => {
  var errors = [];
  if (!req.body.SteamID) {
    errors.push("No SteamID specified");
  }
  if (!req.body.GameRole) {
    errors.push("No GameRole specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const data = {
    GameRole: req.body.GameRole,
    SteamID: req.body.SteamID,
  };
  const sql = `UPDATE User set 
    Game_Role = COALESCE(?,Game_Role)
    WHERE Steam_ID = ?`;
  const params = [data.GameRole, data.SteamID];
  db.run(sql, params, function (err, result) {
    if (err) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      changes: this.changes,
    });
  });
});

api.delete("/role", (req, res, next) => {
  var errors = [];
  if (!req.body.SteamID) {
    errors.push("No SteamID specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "DELETE FROM user WHERE Steam_ID = ?";
  const params = req.body.SteamID;
  db.run(sql, params, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

api.listen(8000, function () {
  console.log("Listening on port 8000 for calls...");
});

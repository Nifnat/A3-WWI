const express = require("express");
var api = express();
var db = require("./dbinit.js");
var bodyParser = require("body-parser");
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.get("/", function (req, res) {
  res.send("Hello World!");
});

api.get("/secret", function (req, res) {
  res.send("Beans are a nutritious food source!");
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

api.get("/role/:steamid", (req, res) => {
  var errors = [];
  if (!req.params.steamid) {
    errors.push("No SteamID specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const params = req.params.steamid;
  const sql = "SELECT Game_Role FROM User WHERE Steam_ID = ?";
  db.get(sql, params, (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ role: row });
  });
});

api.put("/role/:steamid", (req, res) => {
  var errors = [];
  if (!req.params.steamid) {
    errors.push("No SteamID specified");
  }
  if (!req.body.GameRole) {
    errors.push("No GameRole specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    SteamID: req.params.steamid,
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

api.patch("/role/:steamid", (req, res, next) => {
  var errors = [];
  if (!req.params.steamid) {
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
    SteamID: req.params.steamid,
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

api.delete("/role/:steamid", (req, res, next) => {
  var errors = [];
  if (!req.params.steamid) {
    errors.push("No SteamID specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  const sql = "DELETE FROM user WHERE Steam_ID = ?";
  const params = req.params.steamid;
  db.run(sql, params, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", changes: this.changes });
  });
});

api.listen(3000, function () {
  console.log("Listening on port 3000 for calls...");
});

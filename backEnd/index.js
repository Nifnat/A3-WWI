const express = require("express");
var api = express();

api.get("/", function (req, res) {
  res.send("Hello World!");
});

api.get("/secret", function (req, res) {
  res.send("Beans are a nutritious food source!");
});

api.listen(3000, function () {
  console.log("Listening on port 3000 for calls...");
});

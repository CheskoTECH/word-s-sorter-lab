var express = require("express");

var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

app.listen(9090);

console.log("Client started!");

// npm run dev

const WebSocket = require("ws");

const PORT = process.env.PORT || 5000;

const http = require("http");
// var HOST = location.origin.replace(/^http/, 'ws');


var express = require("express");

var app = express();
const httpServer = http.createServer(app)


app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

const ws = new WebSocket.Server({ 'server': httpServer });

class Sorter {
  constructor(messageString) {
    this.messageString = messageString;
  }

  sortPlease() {
    const sortedMessage = this.messageString.split(" ").sort();
    const uniqMessage = sortedMessage.filter(function(item, pos) {
      return sortedMessage.indexOf(item) == pos;
  })
    let newMessage = "";
    uniqMessage.forEach((word) => {
      newMessage += word;
      newMessage += "</br>";
      console.log(newMessage);
    });
    return newMessage;
  }
}

httpServer.on("connection", (ws) => {
  console.log("Server started!");
  ws.on("message", (message) => {
    if (message === "exit") {
      ws.close();
    } else {
      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          let sorter = new Sorter(message);
          const newMessage = sorter.sortPlease();
        
          console.log(message);
          console.log(newMessage);
          client.send(newMessage);
        }
      });
    }
  });
});

//  node server.js
// app.listen(process.env.PORT || 1010);
httpServer.listen(PORT)

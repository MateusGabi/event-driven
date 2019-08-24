const express = require("express");
const bodyParser = require("body-parser");

const { genUID } = require("./app");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connect", function(socket) {
  const { id } = socket;
  console.log(`New conection from: ${id}`);
});

app.use(bodyParser.json());

app.use(function(request, response, next) {
  request.io = io;
  next();
});

app.get("/status", function(request, response) {
  response.json({
    on: true
  });
});

app.post("/publish", function(request, response) {
  const { body } = request;

  const requestId = genUID();

  const payload = {
    ...body,
    metadata: {
      date: new Date(),
      requestId
    }
  };

  request.io.emit(body.type, {
    payload
  });

  response.json(payload);
});

server.listen(8080);

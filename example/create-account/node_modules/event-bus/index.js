const express = require("express");
const bodyParser = require("body-parser");

const { genUID } = require("./app");

module.exports = function(params) {
  // let  { port = Math.random() * 100000 + 40000, onConnectNode } = params || {};

  let port = Math.ceil(Math.random() * 10000 + 3000);
  if (params && params.port) {
    port = params.port;
  }

  const app = express();
  const server = require("http").Server(app);
  const io = require("socket.io")(server);

  io.on("connect", function(socket) {
    if (params.onConnectNode instanceof Function) {
      params.onConnectNode(socket);
    }
  });

  /**
   * Obrigatório ter esse middleware
   */
  app.use(bodyParser.json());

  /**
   * Obrigatório ter esse middleware
   */
  app.use(function(request, response, next) {
    request.io = io;
    next();
  });

  /** Obrigatório ter esse endpoint */
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

    console.log("receive new event", body);

    request.io.emit(body.type, {
      payload
    });

    response.json(payload);
  });

  console.log("Event Bus started at port", port);
  server.listen(port);
};

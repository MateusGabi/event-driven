const express = require("express");
const bodyParser = require("body-parser");

const { genRandomPort, genUID } = require("./app");

class EventBus {
  constructor(props) {
    this.port = (props && props.port) || genRandomPort();
    this.onMicroserviceConnection = props && props.onMicroserviceConnection;

    this.app = express();
    this.server = require("http").Server(this.app);
    this.io = require("socket.io")(this.server);

    this.onConnectStartHandler();
    this.setUpMiddlewares();
    this.setUpRoutes();
  }

  onConnectStartHandler() {
    this.io.on("connect", function(socket) {
      if (this.onMicroserviceConnection instanceof Function) {
        this.onMicroserviceConnection.call(this, socket);
      }
    });
  }

  setUpMiddlewares() {
    // body parser
    this.app.use(bodyParser.json());

    // added io instance
    this.app.use((request, response, next) => {
      request.io = this.io;
      next();
    });
  }

  setUpRoutes() {
    this.app.post("/publish", function(request, response) {
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
  }

  start() {
    console.log("Event Bus Service started at port", this.port);
    this.server.listen(this.port);
  }
}

module.exports = EventBus;

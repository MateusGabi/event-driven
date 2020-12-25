const express = require("express");
const bodyParser = require("body-parser");

const { genRandomPort, genUID } = require("./app");

let SERVICES = [];

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
    this.io.on("connect", function (socket) {
      console.log(socket);
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
    this.app.get("/status", function (request, response) {
      response.json({
        services: SERVICES,
      });
    });

    this.app.post("/publish", function (request, response) {
      const { body } = request;

      const requestId = genUID();

      const payload = {
        ...body,
        metadata: {
          date: new Date(),
          requestId,
        },
      };

      console.log("receive new event", body);

      request.io.emit(body.type, {
        payload,
      });

      response.json(payload);
    });
  }

  start() {
    this.io.on("REGISTRY_SERVICE", function (socket) {
      SERVICES.push({ ...socket, date: new Date() });
    });

    this.io.on("KEEP_ALIVE_EVENT_RESPONSE", function (socket) {
      let ns = SERVICES.map((service) => {
        if (service.instanceId === socket.instanceId) {
          return { ...socket, date: new Date() };
        }

        return service;
      });
      SERVICES = ns;
    });

    setInterval(() => {
      this.io.emit("KEEP_ALIVE_EVENT", {});
    }, 30 * 1000);

    console.log("Event Bus Service started at port", this.port);
    this.server.listen(this.port);
  }
}

module.exports = EventBus;

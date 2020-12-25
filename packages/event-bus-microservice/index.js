const io = require("socket.io-client");
const axios = require("axios");

class Microservice {
  constructor(eventBus) {
    this.eventBus = Object.assign(
      {
        uri: "http://localhost",
        port: 8081,
        name: "#DEFAULT_NAME",
      },
      eventBus
    );
    this.socket = io(`${this.eventBus.uri}:${this.eventBus.port}`);
    this.instanceId =
      Math.random().toString(32).substring(2) +
      Math.random().toString(32).substring(2) +
      Math.random().toString(32).substring(2);

    this.doRegistry();
  }

  doRegistry() {
    this.sendEvent("REGISTRY_SERVICE", {
      name: this.name,
      instanceId: this.instanceId,
    });
  }

  listenEvent(event, callback) {
    this.socket.on(event, callback);
    this.socket.on("KEEP_ALIVE_EVENT", function () {
      this.sendEvent("KEEP_ALIVE_EVENT_RESPONSE", {
        name: this.name,
        instanceId: this.instanceId,
      });
    });
  }

  sendEvent(type, payload) {
    console.log("send event", {
      type,
      payload,
    });

    axios.post(`${this.eventBus.uri}:${this.eventBus.port}/publish`, {
      type,
      payload,
    });
  }
}

module.exports = Microservice;

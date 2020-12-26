const io = require("socket.io-client");
const axios = require("axios");

class Microservice {
  constructor(eventBus) {
    this.eventBus = Object.assign(
      {
        uri: "http://localhost",
        port: 8081,
      },
      eventBus
    );
    this.socket = io(`${this.eventBus.uri}:${this.eventBus.port}`);
    this.instanceId =
      Math.random().toString(32).substring(2) +
      Math.random().toString(32).substring(2) +
      Math.random().toString(32).substring(2);

    this.name = eventBus.serviceName || "DEFAULT_SERVICE_NAME";
  }

  registry() {
    this.sendEvent("REGISTRY_SERVICE", {
      name: this.name,
      instanceId: this.instanceId,
    });
  }

  listenEvent(event, callback) {
    this.socket.on(event, callback);
    this.socket.on("KEEP_ALIVE_EVENT", () => {
      this.sendEvent("KEEP_ALIVE_EVENT_RESPONSE", {
        name: this.name,
        instanceId: this.instanceId,
      });
    });
  }

  sendEvent(type, payload) {
    axios.post(`${this.eventBus.uri}:${this.eventBus.port}/publish`, {
      type,
      payload,
    });
  }
}

module.exports = Microservice;

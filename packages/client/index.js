const io = require("socket.io-client");
const axios = require("axios");

class Microservice {
  constructor(eventBus) {
    this.eventBus = Object.assign(eventBus, {
      uri: "http://localhost",
      port: 8081
    });
    this.socket = io(`${this.eventBus.uri}:${this.eventBus.port}`);
  }

  listenEvent(event, callback) {
    this.socket.on(event, callback);
  }

  sendEvent(type, payload) {
    console.log("send event", {
      type,
      payload
    });

    axios.post(`${this.eventBus.uri}:${this.eventBus.port}/publish`, {
      type,
      payload
    });
  }
}

module.exports = Microservice;

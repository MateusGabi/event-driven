const EventBusServer = require("event-bus-server");

const app = new EventBusServer({
  port: 8081
});

app.start();

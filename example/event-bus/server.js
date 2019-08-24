const EventBusServer = require("event-bus");

const app = new EventBusServer({
  port: 8081
});

app.start();

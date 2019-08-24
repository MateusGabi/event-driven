const eventBusServer = require("event-bus");

eventBusServer({
  port: 8081,
  onConnectNode: function(socket) {
    console.log("New connection on socket id", socket.id);
  }
});

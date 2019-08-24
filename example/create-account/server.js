const Microservice = require("event-bus-microservice");
const axios = require("axios");

const app = new Microservice({
  uri: "http://event-bus",
  port: 8081
});

app.listenEvent("CREATE_ACCOUNT", async function(payload) {
  console.log("creating user", payload.payload.payload.email);

  await new Promise(resolve => setTimeout(() => resolve(null), 3000));

  app.sendEvent("CREATE_ACCOUNT_SUCCESS", {
    email: payload.payload.payload.email,
    id: Math.random()
      .toString(16)
      .substring(2)
  });
});

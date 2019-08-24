const Microservice = require("event-bus-microservice");

const app = new Microservice({
  uri: "http://event-bus",
  port: 8081
});

app.listenEvent("CREATE_ACCOUNT_SUCCESS", async function(payload) {
  console.log("send confirmation email to", payload.payload.payload.email);

  await new Promise(resolve => setTimeout(() => resolve(null), 5000));

  console.log("email sent.");
});

const Microservice = require("event-bus-microservice");

const app = new Microservice({
  uri: "http://localhost",
  port: 8081
});

app.listenEvent("CREATE_ACCOUNT_SUCCESS", async function(payload) {
  console.log("send confirmation email to");

  await new Promise(resolve => setTimeout(() => resolve(null), 5000));

  console.log("email sent.");
});

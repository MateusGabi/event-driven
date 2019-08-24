const Microservice = require("client");

const app = new Microservice({
  uri: "http://localhost",
  port: 8081
});

app.listenEvent("CREATE_ACCOUNT_SUCCESS", async function(payload) {
  console.log("csend confirmation email to");

  await new Promise(resolve => setTimeout(() => resolve(null), 3000));

  console.log("email sent");
});

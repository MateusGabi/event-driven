const io = require("socket.io-client");
const fetch = require("node-fetch");

const socket = io("http://event-source:8080");

socket.on("CREATE_ACCOUNT", function(payload) {
  console.log("Microservice to create account receives an account");
  const body = {
    type: "CREATE_ACCOUNT_SUCCESS",
    payload: {
      userId: "sjhdjashdjkahsd",
      email: "foo@bar.com"
    }
  };

  console.log("publishing new event", body);
  fetch("http://event-source:8080/publish", {
    method: "POST",
    body: JSON.stringify(body)
  });
});

console.log("TO VIVOOOO");

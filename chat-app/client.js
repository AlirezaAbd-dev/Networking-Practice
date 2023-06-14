const net = require("net");

const client = net.createConnection({ port: 3008, host: "127.0.0.1" }, () => {
  console.log("connected to the server!");
});

client.on("end", () => {
  console.log("Connection was ended!");
});

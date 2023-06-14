const net = require("net");

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("a new connection to the server!");
});

server.listen(3008, "127.0.0.1", () => {
  console.log(`opened server on ${JSON.stringify(server.address())}`);
});

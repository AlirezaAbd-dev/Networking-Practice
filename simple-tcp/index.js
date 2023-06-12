const net = require("net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data);
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Opened server on", server.address());
});

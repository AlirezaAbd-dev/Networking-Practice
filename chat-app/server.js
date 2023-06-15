const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log("a new connection to the server!");

  const clientId = clients.length + 1;

  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    clients.map((client) => {
      const dataString = data.toString("utf-8");
      const id = dataString.substring(0, dataString.indexOf("-"));
      const message = dataString.substring(dataString.indexOf("-message-") + 9);

      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });

  socket.on("error", (err) => {
    console.log("one connection closed!");
  });
});

server.listen(3008, "127.0.0.1", () => {
  console.log(`opened server on ${JSON.stringify(server.address())}`);
});

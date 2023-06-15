const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  const clientId = clients.length + 1;

  console.log(`User ${clientId} connected to the server!`);

  // Broadcasting a message to everyone when someone enters the chat room
  clients.forEach((client) => {
    client.socket.write(`User ${clientId} joined!`);
  });

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
    // Broadcasting a message to everyone when someone leaves the chat room
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
    console.log(`${clientId} closed the connection!`);
  });
});

server.listen(3008, "127.0.0.1", () => {
  console.log(`opened server on ${JSON.stringify(server.address())}`);
});

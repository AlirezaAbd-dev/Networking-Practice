const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

server.on("connection", (socket) => {
  console.log("New connection!");

  let fileHandle, fileStream;

  socket.on("data", async (data) => {
    fileHandle = await fs.open("storage/test.txt", "w");
    fileStream = fileHandle.createWriteStream();

    // Writing to our destination file
    fileStream.write(data);
  });

  socket.on("end", () => {
    console.log("connection ended!");

    fileHandle.close();
  });
});

server.listen(5050, "::1", () => {
  console.log(
    `Uploader server is running on ${JSON.stringify(server.address())}`
  );
});

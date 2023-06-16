const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

server.on("connection", async (socket) => {
  console.log("New connection!");

  let fileHandle, fileWriteStream;

  socket.on("data", async (data) => {
    let buff = true;
    if (!fileHandle) {
      fileHandle = await fs.open("storage/test.txt", "w");
      fileWriteStream = fileHandle.createWriteStream();

      // Writing to our destination file
      buff = fileWriteStream.write(data);
    } else {
      buff = fileWriteStream.write(data);
    }

    if (!buff) {
      socket.pause();
    }

    fileWriteStream.on("drain", () => {
      socket.resume();
    });
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

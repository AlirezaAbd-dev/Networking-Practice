const net = require("net");
const fs = require("node:fs/promises");

const server = net.createServer(() => {});

server.on("connection", async (socket) => {
  console.log("New connection!");

  let fileHandle, fileWriteStream;

  socket.on("data", async (data) => {
    let buff = true;
    if (!fileHandle) {
      // Pause the reading until the file is open then resume
      // Because the data will be recieved one after the other and the file isn't open yet
      socket.pause();

      const indexOfDivider = data.indexOf("-------");
      const fileName = data.subarray(10, indexOfDivider).toString("utf-8");

      fileHandle = await fs.open(`storage/${fileName}`, "w");
      fileWriteStream = fileHandle.createWriteStream();

      const indexOfData = data.indexOf("-------") + 7;

      // Writing to our destination file
      buff = fileWriteStream.write(data.subarray(indexOfData));

      // So we pause reading and after file opened we resume reading
      socket.resume();
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

const net = require("net");
const fs = require("node:fs/promises");
const path = require("path");
const { argv } = require("process");

const socket = net.createConnection({ port: 5050, host: "::1" }, async () => {
  const filePath = argv[2];
  const fileName = path.basename(filePath);
  const fileHandle = await fs.open(filePath, "r");
  const fileReadStream = fileHandle.createReadStream();

  socket.write(`fileName: ${fileName}-------`);

  //   Readeing from the source file
  fileReadStream.on("data", (data) => {
    const buff = socket.write(data);

    if (!buff) {
      fileReadStream.pause();
    }

    socket.on("drain", () => {
      fileReadStream.resume();
    });
  });

  fileReadStream.on("end", () => {
    console.log("Done uploading!");
    fileHandle.close();
    socket.end();
  });
});

const net = require("net");
const fs = require("node:fs/promises");

const socket = net.createConnection({ port: 5050, host: "::1" }, async () => {
  const filePath = "./text.txt";
  const fileHandle = await fs.open(filePath, "r");
  const fileStream = fileHandle.createReadStream();

  //   Readeing from the source file
  fileStream.on("data", (data) => {
    socket.write(data);
  });

  fileStream.on("end", () => {
    console.log("Done uploading!");
    fileHandle.close();
    socket.end();
  });
});

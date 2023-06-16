const net = require("net");
const fs = require("node:fs/promises");
const path = require("path");
const { argv, stdout } = require("process");

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection({ port: 5050, host: "::1" }, async () => {
  const filePath = argv[2];
  const fileName = path.basename(filePath);
  const fileHandle = await fs.open(filePath, "r");
  const fileReadStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;

  // For showing the upload progress
  let uploadedPrecentage = 0;
  let bytesUploaded = 0;

  socket.setMaxListeners(100000);

  socket.write(`fileName: ${fileName}-------`);

  // Just for showing precentage right
  console.log();

  //   Readeing from the source file
  fileReadStream.on("data", async (data) => {
    const buff = socket.write(data);

    bytesUploaded += data.length; // add the number of bytes read to the variable
    let newPrecentage = Math.floor((bytesUploaded / fileSize) * 100);

    if (newPrecentage % 1 === 0 && newPrecentage !== uploadedPrecentage) {
      uploadedPrecentage = newPrecentage;

      moveCursor(0, -1);
      clearLine(0);
      console.log(`Uploading... ${uploadedPrecentage}%`);
    }

    if (!buff) {
      fileReadStream.pause();
    }

    socket.on("drain", () => {
      fileReadStream.resume();
    });
  });

  fileReadStream.on("end", () => {
    moveCursor(0, -1);
    clearLine(0);
    console.log("Done uploading!");

    fileHandle.close();
    socket.end();
  });
});

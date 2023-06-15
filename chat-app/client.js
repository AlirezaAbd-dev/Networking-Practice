const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function clearLine(dir) {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
}

function moveCursor(dx, dy) {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
}

let id;

const socket = net.createConnection(
  { port: 3008, host: "127.0.0.1" },
  async () => {
    console.log("connected to the server!");

    async function ask() {
      const message = await rl.question("Enter a message > ");
      //   move the cursor one line up
      await moveCursor(0, -1);
      //   clear the current line that the cursor is in
      await clearLine(0);
      socket.write(`${id}-message-${message}`);
    }

    ask();

    socket.on("data", async (data) => {
      // log an empty line
      console.log();
      //   move the cursor one line up
      await moveCursor(0, -1);
      //   clear that line
      await clearLine(0);

      if (data.toString("utf-8").substring(0, 2) === "id") {
        // When we are getting the id...

        // everything from the third character up until the end
        id = data.toString("utf-8").substring(3);

        console.log(`Your id is ${id}!\n`);
      } else {
        // When we are getting the message...

        console.log(data.toString("utf-8"));
      }

      ask();
    });
  }
);

socket.on("error", async () => {
  console.log();
  await moveCursor(0, -1);
  await clearLine(0);
  console.log("Connection was ended!");

  process.exit(0);
});

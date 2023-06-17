const dgram = require("dgram");

const sender = dgram.createSocket({ type: "udp4", sendBufferSize: 20000 });

sender.send("This is string", 3000, "127.0.0.1", (err, bytes) => {
  if (err) console.log(err);
  console.log(bytes);
});

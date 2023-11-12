const dgram = require('dgram');

const sender = dgram.createSocket({ type: 'udp4', sendBufferSize: 20000 });

sender.send('Hay brother', 3000, '127.0.0.1', (err, _bytes) => {
  if (err) console.log(err);
  // console.log(bytes);
});

sender.on('message', (msg) => {
  console.log(msg.toString('utf-8'));
});

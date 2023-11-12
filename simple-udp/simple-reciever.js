const dgram = require('dgram');

const reciever = dgram.createSocket('udp4');

reciever.on('message', (message, remoteInfo) => {
  console.log(
    `Server got: ${message} from ${remoteInfo.address}:${remoteInfo.port}`,
  );

  reciever.send(
    'I hear you mate',
    remoteInfo.port,
    remoteInfo.address,
    (err, _bytes) => {
      if (err) {
        console.log(err);
      }
      // console.log(bytes);
    },
  );
});

reciever.bind({ address: '127.0.0.1', port: 3000 });

reciever.on('listening', () => {
  console.log(`Server listening ${JSON.stringify(reciever.address())}`);
});

const net = require('net');

const socket = net.createConnection({ host: '127.0.0.1', port: 3000 }, () => {
  const buff = Buffer.alloc(2);
  buff.write('Hi bro!');

  socket.write(buff);
});

socket.on('data', (data) => {
  console.log(data.toString('utf-8'));
});

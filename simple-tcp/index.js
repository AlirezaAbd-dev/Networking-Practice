const net = require('net');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString('utf-8'));

    const buff = Buffer.from('hello stranger');
    socket.write(buff, (err) => {
      if (err) {
        console.log(err);
      }
      socket.destroy();
    });
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Opened server on', server.address());
});

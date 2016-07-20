'use strict';

const net = require('net');

const clients = [];

let server = module.exports = exports = net.createServer((socket) => {
  socket.name = 'User-' + socket.remotePort;
  clients.push(socket);
  console.log('User has connected!');

  socket.on('data', (data) => {
    console.log(socket.name + ' has sent a message');
    clients.forEach((client) => {
      if (socket.name !== client.name)
        client.write(socket.name + ': ' + data.toString());

    });

    if (data.toString() === 'END\r\n')
      socket.end();
  });

  socket.on('end', function(){
    console.log('User has disconnected');
    clients.splice(clients.indexOf(socket), 1);
  });

}).listen(3000, () =>{
  console.log('Up on 3000!');
});

'use strict';

const net = require('net');

let clients = [];

module.exports = exports = net.createServer(function(socket) {
  clients.push(socket);

  socket.write('Welcome to the chat server! \n');
  socket.name = 'User-' + socket.remotePort;
  socket.pipe(process.stdout);
  console.log(socket.name + ' has connected! \n');

  clients.forEach(function(client){
    if (client !== socket)
      client.write(socket.name + ' has connected! \n');
  });

  socket.on('data', function(data) {
    clients.forEach(function(client) {
      if (client !== socket)
        client.write(socket.name + ': ' + data.toString());
    });

    if (data.toString() === 'END\r\n')
      socket.end();
  });

  socket.on('end', function() {
    clients.forEach(function(client){
      if (client!== socket)
        console.log(socket.name + ' has disconnected. \n');
    });

    console.log(socket.name + 'has disconnected.');
    clients.splice(clients.indexOf(socket), 1);
  });
});

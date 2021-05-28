const express = require('express');
const app = express();

const http = require('http');
const http_server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(http_server);

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index-ws.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});


http_server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
console.log(__dirname)

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '../canvas.html');

const app = express();
app.use(express.static('../'));

const server = app
    .use((req, res) => res.sendFile(INDEX) )
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

var i = 0;
//TODO need a heartbeat
wss.on('connection', (ws) => {
  ws.id = i++;
  console.log('Client', ws.id, 'connected');
  ws.onmessage = function (event) {
    wss.clients.forEach((client) => {
      if (client.id != ws.id)
        client.send(event.data);
    });
  }
  ws.on('close', () => console.log('Client', ws.id, 'disconnected'));
});


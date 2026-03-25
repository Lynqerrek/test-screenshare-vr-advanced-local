const express = require('express');
const path = require('path');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = 9000;

// Serve the client files
app.use(express.static(path.join(__dirname, 'public')));

// Self-host PeerJS signaling on the host PC
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Host server running on http://0.0.0.0:${PORT}`);
  console.log(`Open on host:  http://localhost:${PORT}`);
  console.log(`Open on phone:  http://<HOST_LAN_IP>:${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  path: '/peerjs',
  debug: true,
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Peer connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Peer disconnected:', client.getId());
});

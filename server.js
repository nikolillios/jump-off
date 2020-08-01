const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const message = 'hello, bitch';
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/jump-off'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/jump-off/index.html'));
});

// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 4200, () => {
  console.log('listening');
});

io.on('connection', socket => {
  socket.emit('message', message);
  socket.on('move', data => {
    state.pos1 = data;
  });
});
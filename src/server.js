const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
const io = require('socket.io')(server);

server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}


io.on('connection', function(socket) {
  socket.on('clicked', function(data) { 
    io.sockets.emit('updateView');
  })
});

server.on("listening", () => {
  console.log(`server is listening for requests on port ${server.address().port}`);
});
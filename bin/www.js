const app = require('../app');
const http = require('http');

const port = process.env.PORT || 1337;
app.set('port', port);

const server = http.createServer(app)
  .listen(port, "127.0.0.1", function() {
    console.log('server is running at 127.0.0.1:1337')
  });

server.on('error', handelError);

function handelError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}



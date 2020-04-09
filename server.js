//import io from 'https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js';


var express = require('express'); // Express contains some boilerplate to for routing and such
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

// Serve the index page 
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// Listen on port 5000
app.set('port', (process.env.PORT || 5000));
http.listen(app.get('port'), function(){
  console.log('listening on port',app.get('port'));
});

alert('lox');


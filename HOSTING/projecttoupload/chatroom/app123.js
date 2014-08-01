var express = require('express')
  , app = express()
  , http = require('http')
   , fs = require("fs")
  , server = http.createServer(app)
 // ,routes = require('./routes/script')
  , io = require('socket.io').listen(server);
/*
//io.set('transports', ['xhr-polling']);
//setting the transports by order, if some client
//is not supporting 'websockets' then the server will
//revert to 'xhr-polling' (like Comet/Long polling).
//for more configurations go to:
//https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
io.set('transports', [ 'websocket', 'xhr-polling' ]);
*/
server.listen(8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

// routing
app.get('/',function(request, response) 
		{
	//res.render('index.jade');
	//response.json({ message: 'hello' });
	 fs.readFile("./public/index.htm", "binary", function(error, file) {
		    if(error) {
		      response.writeHead(500, {"Content-Type": "text/plain"});
		      response.write(error + "\n");
		      response.end();
		    } else {
		      response.writeHead(200, {"Content-Type": "text/html"});
		      response.write(file, "binary");
		      response.end();
		    }
		  });
		});
// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['room1','room2','room3'];

//io.set('transports', ['xhr-polling']);
io.sockets.on('connection', function (socket) {
	
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.myroom = 'room1';
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
		socket.emit('updaterooms', rooms, 'room1');
		
	});
	
	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.myroom).emit('updatechat', socket.username, data);
	});
	
	socket.on('switchRoom', function(newroom){
		socket.leave(socket.myroom);
		socket.join(newroom);
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.myroom).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.myroom = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});
	

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.myroom);
	});
});

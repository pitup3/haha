define(["app","socketio"],function(app,io){
 
 
  /*Socket.io*/
     
     var socket;
     
     var initialize = function ()
     {
     	 socket = io.connect(app.socketUrl);
     	
     	 socket.on('connect', function() {
			// call the server-side function 'adduser' and send one parameter (value of prompt)
			//console.log("On - connect, call Emit - adduser");
			app.socketConnected=true;
			socket.emit('adduser', prompt("What's your name?"));
			console.log("socket connected");
		});
		
		 socket.on("disconnect", function() {
     		 app.socketConnected = false;
     		 console.log("Socket Disconnected");
   			//   HIT.vent.trigger("socket:disconnected");
   		 });
 
   		 socket.on("error", function(err){
      		//console.log("ERROR: ", err);
    		});
		
		//listener, whenever the server emits 'updatechat', this updates the chat body
		 socket.on('updatechat', function(username, data) {
			 require(["controllers/chatController"], function(controller){
				app.vent.trigger("updateChat",username,data);
			});
			//console.log("On - updateChat "+username+" "+data);
		});
		
		 socket.on('updaterooms', function(rooms, current_room) {
			// console.log("On  - updateRooms "+rooms+" "+current_room);
			
			 require(["controllers/chatController"], function(controller) {
				app.vent.trigger("updateRooms",rooms,current_room);
			});
			
		});
		
     };
     
     app.vent.on("switchRoom",function(room){
     		if(app.socketConnected)
     			socket.emit('switchRoom', room);
     });
     
     app.vent.on("sendChat",function(message){
     	if(app.socketConnected)
     		socket.emit('sendchat', message);
     });
      
     app.addInitializer(function(){
   		  initialize();
     });

});
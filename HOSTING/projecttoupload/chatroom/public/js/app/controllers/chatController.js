define(["app","views/chatView"],function(app,chatView){
	
	app.module("chat.Controller",function(controller, app, Backbone, Marionette, $, _){
	
		controller.chatController = Backbone.Marionette.Controller.extend({
	
	 	  initialize:function (options) {
               //console.log("inside intialisation");
             },
     	
     	  //gets mapped to in AppRouter's appRoutes
      	  index:function(){
          	    
          	 require(["collections/chatCollection","collections/chatCollection"], function() {
          	   
          	     var links = app.request("header:items");
          	     var chats = app.request("chat:items");
          	  
          	   	 console.log(links);
          	   	 console.log(chats);
          	    
          	     var chatHeader = new chatView.headerView({collection: links});
          	     var chatContent = new chatView.msgView({collection:chats});
          	     var chatFooter=new chatView.footerView();
          	     var chatPageLayout = new chatView.layout();
          	   
          	  
          	  
          	  
          	      chatHeader.on("itemview:switchRoom", function(childView, model){
          			   var selectedRoom = model.get("value");
          			  API.setActiveRoom(selectedRoom);
          			  app.vent.trigger("switchRoom",selectedRoom);
          		 });
          		 
          		 chatFooter.on("sendChatMessage", function(msg){
          			 app.vent.trigger("sendChat",msg);
          		 });
          		 
          		
          		 chatPageLayout.on("logout", function(msg){
          			
          				$.get(app.urlAdd+"/logout",function(msg){
							app.trigger("show:signIn");
						});
          			 
          		 });
          		 
          		  chatPageLayout.on("terminateSessions", function(msg){
          			 $.get(app.urlAdd+"/terminate",function(msg){
							alert(msg);
						});
          		 });
         		    
          	  	  app.mainRegion.show(chatPageLayout);
    	   	 	 	  chatPageLayout.footer.show(chatFooter);
    	   	 		  chatPageLayout.header.show(chatHeader);
    	   	 		  chatPageLayout.conversations.show(chatContent);
    	   	 	    
    	   	 	    });
           },
          
	 });
	 
     });
	 
	 var API = {
         		    
         		setActiveRoom :function(selectedRoom)
         		{
           		   require(["collections/chatCollection"], function() {
           		     var links = app.request("header:items");
           		    
           		      links.each(function(room){
          			  		if(room.get("value") === selectedRoom) 
          			  			room.set("selected",true);
     	 	  				else
     	 	  					room.set("selected",false);	
          			  });
          			 links.trigger("reset");
          		 });
          	}	
         };
	 
	  app.vent.on("updateRooms",function(rooms,selectedRoom){
     	  require(["collections/chatCollection","models/chatModel"], function(collection,model) {
           		var links = app.request("header:items");
           		var allRooms=[];
           		$.each(rooms,function(key,value){
           			var room = new model.headerModel({"value":value});	
           			allRooms.push(room);
           		});     
           		links.reset(allRooms);
           		API.setActiveRoom(selectedRoom);
     		});
      });
     
      app.vent.on("updateChat",function(userName,data){
     		 require(["collections/chatCollection","models/chatModel"], function(collection,model) {
     		 
     		 var chats = app.request("chat:items");
     		 var chat = new model.chatModel({"name":userName,"content":data});
     		 chats.add(chat);
     		// console.log("vent - on updatechat");
     		
     		});
     });
     
     
     return app.chat.Controller;
});

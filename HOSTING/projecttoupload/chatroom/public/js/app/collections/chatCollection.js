define(["app","models/chatModel"], function(app,model) {
        
     app.module("chat.Collection", function(collection,app, Backbone, Marionette, $, _){
        		
        		// Creates a new Backbone Model class object
        	  collection.headerCollection = Backbone.Collection.extend({
				model : model.headerModel,
      			 initialize: function(){
     	  		  }
  			  });
  			  
  		   collection.chatCollection = Backbone.Collection.extend({
				model : model.chatModel,
      			 initialize: function(){
     	  		  }
  			  });  
  			  
  		    var initializeHeaders = function(){
  				 collection.headers = new collection.headerCollection();
  			  }
  			  
  		    var initializeChatCollection = function(){
  			 	collection.chats = new collection.chatCollection();
  			 } 
  			  
  	 		var API = {
  				
  				getHeaders: function() {
        				if(collection.headers === undefined){
       						initializeHeaders();
       		 		}
        				return collection.headers;
    				 },
    		 
    				 getChats:function() {
    		 			if(collection.chats === undefined){
    		 				initializeChatCollection();
    		 			}
    		 			return collection.chats;
    				 }
  		     }
  	 
  			app.reqres.setHandler("header:items", function(){
      			return API.getHeaders();
  			  });
    
   			app.reqres.setHandler("chat:items", function(){
      				return API.getChats();
   			 });

     });
      return app.chat.Collection;
});

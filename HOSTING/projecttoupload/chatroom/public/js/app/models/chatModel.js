define(["app"], function(app) {
        
     app.module("chat.Model", function(model,app, Backbone, Marionette, $, _){
        		
        		model.headerModel = Backbone.Model.extend({

          		  // Model Constructor
           		 initialize: function() {

          		  },

          		  // Default values for all of the Model attributes
          		  defaults: {
						selected:false
         			   },

           		// Get's called automatically by Backbone when the set 		and/or save methods are called (Add your own logic)
         		    validate: function(attrs) {
		
          	  },

       	 });
        		
        		model.chatModel = Backbone.Model.extend({

          		  // Model Constructor
           		 initialize: function() {

          		  },

          		  // Default values for all of the Model attributes
          		  defaults: {
	
         			   },

           		// Get's called automatically by Backbone when the set 		and/or save methods are called (Add your own logic)
         		    validate: function(attrs) {
		
          	  }

       	 });
        
	});
        
      return app.chat.Model;

});
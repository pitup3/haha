define(["app"],function(app){

	app.module("chat",function(chat, app, Backbone, Marionette, $, _){
		
		chat.router=Backbone.Marionette.AppRouter.extend({
			appRoutes : {
				"chat":"showchat"
			}
		});
		
		/*appRoutes Methods implementation*/
		var API = {
			  showchat : function()
			  {
			  		 require(["controllers/chatController","init/socketAdaptor"], function(controller){
          				 var controllerObj=new controller.chatController();
          				 controllerObj.index();
          			});
			  }
		};
		
		/*this methods gets triggered from anywhere*/
		app.on("show:chat",function(){
			 	app.navigate("chat");
			 	API.showchat();
			 	//console.log("chatcalled");
		 });	
		 
		
		 /*add Router object into app*/
		app.addInitializer(function(){
			new chat.router({
       				 controller: API
     		 });
		 });
			 
	});
		return app.chat;
});







define(["app"],function(app){

	app.module("signIn",function(signin, app, Backbone, Marionette, $, _){
		
		signin.router=Backbone.Marionette.AppRouter.extend({
			appRoutes : {
				"":"showSignInForm"
			}
		});
		
		/*appRoutes Methods implementation*/
		var API = {
			  showSignInForm : function()
			  {
			  		 require(["controllers/signInController"], function(controller){
          				 var controllerObj=new controller.signInController();
          				 controllerObj.index();
          			});
			  }
		};
		
		/*this methods gets triggered from anywhere*/
		app.on("show:signIn",function(){
			 	app.navigate("");
			 	API.showSignInForm();
			 	//console.log("signIncalled");
		 });	
		 
		
		 /*add Router object into app*/
		app.addInitializer(function(){
			new signin.router({
       				 controller: API
     		 });
		 });
			 
	});
		return app.signIn;
});







define(["app"],function(app){

	app.module("signUp",function(signUp, app, Backbone, Marionette, $, _){
		
		signUp.router=Backbone.Marionette.AppRouter.extend({
			appRoutes : {
				"registration":"showSignUpForm"
			}
		});
		
		/*appRoutes Methods implementation*/
		var API = {
			  showSignUpForm : function()
			  {
			  		 require(["controllers/signUpController"], function(controller){
          				 var controllerObj=new controller.signUpController();
          				 controllerObj.index();
          			});
			  }
		};
		
		/*this methods gets triggered from anywhere*/
		app.on("show:signUp",function(){
			 	app.navigate("registration");
			 	API.showSignUpForm();
		 });	
		 
		
		 /*add Router object into app*/
		app.addInitializer(function(){
			new signUp.router({
       				 controller: API
     		 });
		 });
			 
	});
		return app.signUp;
});







define(["app","hbs!templates/signUp"],function(app,template)
{
		app.module("signUp.View", function(view, app, Backbone, Marionette, $, _)
		{
			view.signUpFormView = Marionette.ItemView.extend({
		     		template : template,
		     		tagName : 'div',
		     		className : 'container sign-in-container',
		     		initialise :function(){
						//console.log("initialise signUpForm");
					},
		     		
		     		events : {
		     			"click #signInBtn":"navigateToSignIn"
		     		},
		     		
		     		navigateToSignIn : function(e) {
		     				e.preventDefault();
							alert("in View SignIn clicked");
							this.trigger("navigateToSignIn");
		     		},
		     		
		     		onRender : function() {
		     		
		     		},
		     	
		     	
		     });
		});
			return app.signUp.View;
});

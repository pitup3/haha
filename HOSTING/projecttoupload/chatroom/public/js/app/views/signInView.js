define(["app","hbs!templates/signIn"],function(app,template)
{
		app.module("signIn.View", function(view, app, Backbone, Marionette, $, _)
		{
			view.signInFormView = Marionette.ItemView.extend({
		     		template : template,
		     		tagName : 'div',
		     		className : 'container sign-in-container',
		     		initialise :function(){
						//console.log("initialise signInForm");
					},
		     		
		     		events : {
		     			"click #signUpBtn":"navigateToRegistration"
		     		},
		     		navigateToRegistration : function(e) {
		     				e.preventDefault();
							alert("in View Register clicked");
							this.trigger("navigateToRegistration");
		     		},
		     	
		     	
		     });
		});
			return app.signIn.View;
});

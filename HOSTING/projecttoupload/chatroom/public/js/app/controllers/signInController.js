define(["app","views/signInView","bootstrapValidator"],function(app,signInView){
	
	app.module("signIn.Controller",function(controller, app, Backbone, Marionette, $, _){
		controller.signInController = Backbone.Marionette.Controller.extend({
	
	 	     	initialize:function () {
           	   
           	     },
     	
     	 		 index:function() {
          	 		 var view = new signInView.signInFormView({});
          	 		 
          	 	    //------------Views Trigger Methods-----------
				      view.on("navigateToRegistration", function(){
          			      alert("in Controller Register clicked");
						//console.log(this);
						 app.trigger("show:signUp");
          		   });
          	 		 
    	   		 		   app.mainRegion.show(view);
    	   		 		  // this.resetSignInForm();
    	   		 		  this.validateSignInForm();
    	   			},
    	   		
				 validateSignInForm:function(){
					  $('#signInForm').bootstrapValidator({
						  message: 'This value is not valid',
						  feedbackIcons: {
							valid: 'glyphicon glyphicon-ok',
							invalid: 'glyphicon glyphicon-remove',
							validating: 'glyphicon glyphicon-refresh'
						},    
						
						  fields: {
							 email: {
								validators: {
									notEmpty: {
										message: 'The email address is required'
									},
									emailAddress: {
										message: 'The input is not a valid email address'
									}
								}
							},
							password: {
								validators: {
									notEmpty: {
										message: 'The password is required'
									}
								}
							}
						},
						
						  submitHandler: function(validator, form, submitButton) 
        					  {
 								  $.post(app.urlAdd+"/login", form.serialize(),
								  function(result) 
								  {
										 alert(JSON.stringify(result));
										 var obj = JSON.parse(JSON.stringify(result));
										 if(obj.message=='success'){
											 app.trigger("show:chat");
										}
										 else {
											alert(obj.message);
										}
								   });
          	 			 },
     		 	     });
				},
				
				  resetSignInForm:function(){
				  		$("#signInForm").data('bootstrapValidator').resetForm();
				  },
				  
				  showSignUpForm:function(){
				  	 app.trigger("show:signUp");
				  },
				
			});

	 });
		return app.signIn.Controller;
});

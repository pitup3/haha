define(["app","views/signUpView","bootstrapValidator"],function(app,signUpView){
	
	app.module("signUp.Controller",function(controller, app, Backbone, Marionette, $, _){
		controller.signUpController = Backbone.Marionette.Controller.extend({
	
	 	     	initialize:function () {
           	   
           	     },
     	
     	 		 index:function() {
          	 		 var view = new signUpView.signUpFormView({});
    	   		 		
    	   		 		 //------------Views Trigger Methods-----------
				      view.on("navigateToSignIn", function(){
          			      alert("in Controller SignIn clicked");
						 app.trigger("show:signIn");
          		   });
          	 		 
    	   		 		 app.mainRegion.show(view);
    	   		 		// this.resetSignUpForm();
    	   		 		 this.validateSignUpForm();
    	   			},
    	   		
				 validateSignUpForm:function(){
					$('#signUpForm').bootstrapValidator({
						message: 'This value is not valid',
						feedbackIcons: {
							valid: 'glyphicon glyphicon-ok',
							invalid: 'glyphicon glyphicon-remove',
							validating: 'glyphicon glyphicon-refresh'
						},    
						fields: {
							fname: {
								validators: {
									notEmpty: {
										message: 'The first name is required and cannot be empty'
									}
							   }
							},
							lname: {
								validators: {
									notEmpty: {
										message: 'The last name is required and cannot be empty'
									}
								}
							},
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
							gender: {
								validators: {
									notEmpty: {
										message: 'The gender is required'
									}
								}
							},
						     /* dob: {
								validators: {
									notEmpty: {
										message: 'The date of birth is required and cannot be empty'
									},
									date: {
										format: 'YYYY/DD/MM',
										message: 'The value is not a valid date'
									}
								}
							},*/
							passwd: {
								 threshold: 8,
								 validators: {
									notEmpty: {
										message: 'The password is required'
									}
								}
							},
							conpasswd: {
								threshold: 8,
								validators: {
									notEmpty: {
										message: 'The password is required'
									}
								}
							}
						},
						submitHandler: function(validator, form, submitButton) {
							$.post(app.urlAdd+"/signup", form.serialize(),function(result)
							 {
									var obj = JSON.parse(JSON.stringify(result));
									console.log("message "+obj.message);
									if(obj.message=='success')
									{
											app.trigger("show:chat");
									}
									else
									{
											alert(obj.message);
									}
							});     	
						}
					});
				},
				
				  resetSignUpForm:function(){
				  		$("#signUpForm").data('bootstrapValidator').resetForm();
				  },
				  
				    showSignInForm:function(){
				  	 app.trigger("show:signIn");
				  },
			});

	 });
		return app.signUp.Controller;
});

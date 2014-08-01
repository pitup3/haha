define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
       
        var MyApp = new Backbone.Marionette.Application();
		
		 MyApp.socketUrl="http://localhost:8080/";
		MyApp.urlAdd="http://localhost:8080";
		MyApp.socketConnected=false;
	
        //==== Mobile or desktop detection ======
        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }
        
       /* function isSessionOn() {
        		 $.get(MyApp.urlAdd+"/checksession",function(msg)
     		 {
				console.log("sessionexists "+msg);
				return msg;
			});
        }
        
        MyApp.Session = isSessionOn();*/
	   MyApp.mobile = isMobile();
	  
	  MyApp.addRegions({
            headerRegion:"#header",
            mainRegion:"#main"
        });

   	   MyApp.navigate = function(route,  options){
 			 options || (options = {});
  			Backbone.history.navigate(route, options);
	  };
        
        MyApp.getCurrentRoute = function(){
	 	  return Backbone.history.fragment
	  };
        //,"init/socketAdaptor"
        MyApp.addInitializer(function () 
        {
            if(Backbone.history)
            {
			require(["js/app/routers/chatRouter.js","js/app/routers/signInRouter.js","js/app/routers/signUpRouter.js","init/socketAdaptor"], function () {
     			   Backbone.history.start();
     			   if(MyApp.getCurrentRoute() === "")
     			   {
         					/*console.log("session is "+MyApp.Session);
         					 $.get(MyApp.urlAdd+"/checksession",function(msg)
         				    {
         						if(msg=="true")
             						MyApp.trigger("show:chat");
             					else	
             						MyApp.trigger("show:signIn");
         					});*/
     				  MyApp.trigger("show:chat");
         					
         			   }
         		}); 
     	  };	 
        });
     
   
     
	return MyApp;
});

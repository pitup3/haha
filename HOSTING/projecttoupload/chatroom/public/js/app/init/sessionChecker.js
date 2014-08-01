define(["app"],function(app){
 
  
    initialize : function () {
     	 $.get("/checksession",function(msg)
     	 {
			console.log("sessionexists "+msg);
			return msg;
		});
		
     };
  
});
define(["app","models/chatModel","hbs!templates/chat-layout",
"hbs!templates/chat-header","hbs!templates/chat-item","hbs!templates/chat-footer"],function(app,model,layoutTmpl,headerTmpl,itemTmpl,footerTmpl)
{
		app.module("chat.View", function(view, app, Backbone, Marionette, $, _)
		{
			view.layout = Backbone.Marionette.Layout.extend({  
				template : layoutTmpl,
				tagName : 'div',
		     	className : 'container chat-container',
		     	
				regions: {
					header: "#rooms",
					conversations:"#conversation",
					footer:"#chatControls"
				},
				
				events : {
		     			"click #logoutBtn" : "logout",
		     			"click #terminateSessions" : "terminateSessions"
		     		},
		     		
		     	logout : function(e){
		     			e.preventDefault();
		     			this.trigger("logout");
		     		},
		     		
		     	terminateSessions : function(e){
		     			e.preventDefault();
		     			this.trigger("terminateSessions");
		     		},
		     		
				initialise :function(){
						//console.log("initialise layout");
					}
			
			});
			
			view.footerView = Marionette.ItemView.extend({
		     		
		     		template : footerTmpl,
		     		ui : {
						"inputTxt" : "#data",
						"sendBtn" : "#datasend"		     		
		     		},	
		     		
		     		events : {
		     			"click #datasend" : "sendMsg",
		     			"keypress #data" : "enterPressedSendMsg"
		     		},
		     		enterPressedSendMsg : function(e) {
		     			if(e.which == 13)
		     			{
		     				$("#data").blur();
		     				$('#datasend').focus();
		     				this.sendMsg(e);
		     			}
		     		},
		     		sendMsg : function(e) {
		     			e.preventDefault();
		     			var message = this.ui.inputTxt.val();
		     			this.ui.inputTxt.val(' ');
						this.trigger("sendChatMessage",message);
						this.ui.inputTxt.focus();
					},
		     		
		     });
		    
		     view.header = Marionette.ItemView.extend({
		    			template:headerTmpl,
		    			tagName:"div",
		    			className:"col-md-4 col-xs-4 room",
		    			events:{
		    				"click a":"switchRoom"
		    			},
		    			
		    			switchRoom:function(e) {
		    				e.preventDefault();
		    				this.trigger("switchRoom",this.model);
		    			},
		    			
		    			onRender : function() {
						if(this.model.get("selected"))
						{
							this.$el.addClass("selected-room");
						};
					}
		    
		    });
		    
		     view.headerView = Marionette.CollectionView.extend({
		     		itemView:view.header
		     });
		    
		     view.msg = Marionette.ItemView.extend({
		     		template:itemTmpl,
		     		tagName:"div",
		     		className:"messages msg_sent",
		     });
		     
		     view.msgView = Marionette.CollectionView.extend({
		     		itemView:view.msg
		     });
		     
		});
		return app.chat.View;
});

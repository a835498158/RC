
Meteor.startup(function() {
	

	RocketChat.MessageAction.addButton({
		id: 'analyse-message',
		icon: 'pin',
		label: 'Analyse Message',
		context: ['message', 'message-mobile'],
		action() {
			const message = this._arguments[1];
				console.log(message.msg);
				//var tone1 = result;
				//const user = Template.instance().user.get();
				const user1= Meteor.user();
				console.log(user1.roles[0]);
				Meteor.call('wat', message, function(error, result) {
				if (error) {
					return handleError(error);
				}
				//console.log(tone1.document_tone);
				console.log(this);
			});

		},
		condition(message) {
			const user1= Meteor.user();
				//console.log(user1.roles[0]);
				if(user1.roles[0] == "admin"  ){
				//if(user1.roles[0] = "user" ){return false;}
					//console.log("admin123");
					return true;	}
				//	console.log("user321");

			//if(!Meteor.user().roles[0] = "admin"){return false;}
			return RocketChat.authz.hasAtLeastOnePermission('analyse-message', message.rid);;
		},
		order: 22,
		group: 'menu'
	});

	
});

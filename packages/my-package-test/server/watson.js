Meteor.methods({
	wat(message){
		var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
			var tone_analyzer = new ToneAnalyzerV3({
				
			     username:"ee4752b2-37c6-41b5-8346-bacd7a56a249",
			     password:"Yc3PqEYHVoEN",
				version_date:'2018-03-04'});
			var text = message.msg;
			// Turn our text into valid json.
			var input = { "text": text };

			// The format that the tone analyzer needs. 
			var params = 
			        {
			        'tone_input': input,
			        'content_type': 'application/json'
			        };
		
			return new Promise(function(resolve, reject) {
					tone_analyzer.tone(params,function(error,response){
						if(error) reject();

						resolve(response);
					});
			}).then(function(response) {
		const user1= Meteor.user();
				if(user1.roles[0] == "user"  ){
					return;	}
				// update message to include an attachment
				message.attachments = [
				{
					'text': JSON.stringify(response.document_tone),
					'author_name': "Watson",
					//'author_icon': getAvatarUrlFromUsername(originalMessage.u.username),
					'ts': new Date()
				}];

				// save/update message
				RocketChat.models.Messages.update(message._id, message);
				return message;
			}); 
				
				
	}
});

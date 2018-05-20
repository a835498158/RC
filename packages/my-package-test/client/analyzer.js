var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
			var tone_analyzer = new ToneAnalyzerV3({
				
			     username:"ee4752b2-37c6-41b5-8346-bacd7a56a249",
			     password:"Yc3PqEYHVoEN",
				version_date:'2018-03-04'});
			var params = {
				'tone-input':require('./tone.json'),
				'content_type':'application/json'
			};
		
			tone_analyzer.tone(params,function(error,reponse){
				if(error)
				console.log('error:',error);
				else
				console.log(JSON.stringify(response,null,2));			
			});

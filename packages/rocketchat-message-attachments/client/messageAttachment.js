import moment from 'moment';
const colors = {
	good: '#35AC19',
	warning: '#FCB316',
	danger: '#D30230'
};
const fixCordova = function(url) {
	if (url && url.indexOf('data:image') === 0) {
		return url;
	}
	if (Meteor.isCordova && (url && url[0] === '/')) {
		url = Meteor.absoluteUrl().replace(/\/$/, '') + url;
		const query = `rc_uid=${ Meteor.userId() }&rc_token=${ Meteor._localStorage.getItem('Meteor.loginToken') }`;
		if (url.indexOf('?') === -1) {
			url = `${ url }?${ query }`;
		} else {
			url = `${ url }&${ query }`;
		}
	}
	if (Meteor.settings['public'].sandstorm || url.match(/^(https?:)?\/\//i)) {
		return url;
	} else if (navigator.userAgent.indexOf('Electron') > -1) {
		return __meteor_runtime_config__.ROOT_URL_PATH_PREFIX + url;
	} else {
		return Meteor.absoluteUrl().replace(/\/$/, '') + url;
	}
};
/*function newdiv(){
	var div = document.createElement('test1');
	var caiji = document.getElementById('caiji');
	div.innerHTML = text;
	div.style.backgroundColor = "red";
	console.log(text);
	caiji.appendChild(div);
	var div1 = document.createElement('test1');
	var qwer = document.getElementById('caiji');
	div1.innerHTML = "dalhgdkshgfkshklfsl";
	div1.style.backgroundColor = "red";
	//console.log(text);
	qwer.appendChild(div1);
	return div1;
}*/
/*globals renderMessageBody*/
Template.messageAttachment.helpers({
	fixCordova,
	parsedText() {

		/*var odiv = document.createElement('div');
		var baba = document.getElementById('ceshi');
		odiv.innerHTML = "fuck you";
		baba.appendChild(odiv);*/
		//var d = document.getElementById("attachment-flex-column-grow attachment-text");
		//d.style.backgroundColor = "red";
		//console.log(this);
		return renderMessageBody({
			//msg: this.text + "hushaoyu"
		});
	},
	islaji(){
		const user1= Meteor.user();
				//console.log(user1.roles[0]);
				if(user1.roles[0] == "admin"  ){
					return true;	}
		return false;
	},
	isTest(){
		if(this.author_name == "Watson"){return true;}
		return false;
	},
	isAuthor(){

		if(this.author_name == Watson){return true;}
		return false;

	},
	/*
	caiJi(){
		var tones_length = JSON.parse(this.text);
		var value = "N";
		var laji = tones_length.score;
		if(laji<=1){value = "M"}
		return value;

	},*/
	cam(){ 
		const analyse = [];
		const color = {"Sadness":{"LOW":"#ffffff", "HIGH":"#086db2", "MEDIUM":"#69c3e2"},
						"Anger":{"LOW":"#ffffff", "HIGH":"#e80521", "MEDIUM":"#ffa197"},
						"Joy":{"LOW":"#ffffff", "HIGH":"#ffd629", "MEDIUM":"#fff173"},
						"Confident":{"LOW":"#ffffff", "HIGH":"#592684", "MEDIUM":"#a779d8"},
						"Analytical":{"LOW":"#ffffff", "HIGH":"#075cd8", "MEDIUM":"#19a3f7"},
						"Fear":{"LOW":"#ffffff", "HIGH":"#325e2b", "MEDIUM":"#7db258"},
						"Tentative":{"LOW":"#ffffff", "HIGH":"#1ae5cd", "MEDIUM":"#94ffef"}};
		//const colour = {"Sadness_low":"caonima"};
		const tones_length = JSON.parse(this.text);



		for(var i=0; i<tones_length.tones.length; i++){
			if(tones_length.tones[i].score<0.5000000){
				var tone_name = tones_length.tones[i].tone_name;
				if(tone_name =="Sadness"){
				var color_low = color.Sadness.LOW}

				else if(tone_name == "Anger"){
				var color_low = color.Anger.LOW}

				else if(tone_name == "Confident"){
				var color_low = color.Confident.LOW}

				else if(tone_name == "Analytical"){
				var color_low = color.Analytical.LOW}

				else if(tone_name == "Fear"){
				var color_low = color.Fear.LOW}
				
				else if(tone_name == "Tentative"){
				var color_low = color.Tentative.LOW}

				else if(tone_name == "Joy"){
				var color_low = color.Joy.LOW}

				analyse.push({'result':tone_name ,'color': color_low, 'text': "LOW" });					
			}
			else if(tones_length.tones[i].score>0.75000000){
				var tone_name = tones_length.tones[i].tone_name;
				if(tone_name == "Sadness"){
				var color_high = color.Sadness.HIGH}

				else if(tone_name == "Anger"){
				var color_high = color.Anger.HIGH}


				else if(tone_name == "Confident"){
				var color_high = color.Confident.HIGH}

				else if(tone_name == "Analytical"){
				var color_high = color.Analytical.HIGH}
				
				else if(tone_name == "Fear"){
				var color_high = color.Fear.HIGH}
				
				else if(tone_name == "Tentative"){
				var color_high = color.Tentative.HIGH}

				else if(tone_name == "Joy"){
				var color_high = color.Joy.HIGH}

				
				analyse.push({'result':tone_name,'color': color_high,'text': "HIGH" });					
			}
			else{
				var tone_name = tones_length.tones[i].tone_name;

				if(tone_name == "Sadness"){
				var color_medium = color.Sadness.MEDIUM}

				else if(tone_name == "Anger"){
				var color_medium = color.Anger.MEDIUM}


				else if(tone_name == "Confident"){
				var color_medium = color.Confident.MEDIUM}

				else if(tone_name == "Analytical"){
				var color_medium = color.Analytical.MEDIUM}
				
				else if(tone_name == "Fear"){
				var color_medium = color.Fear.MEDIUM}
				
				else if(tone_name == "Tentative"){
				var color_medium = color.Tentative.MEDIUM}

				else if(tone_name == "Joy"){
				var color_medium = color.Joy.MEDIUM}

				
				analyse.push({'result':tone_name,'color': color_medium,'text': "MEDIUM" });		

			}
			
		
		}
		console.log(this);
		return analyse;
		/*[{'color': "#000000",
		'text': "50%" },
		{'color':"green",
		'text': "8%"}]*/
	},

	loadImage() {
		const user = Meteor.user();
		if (this.downloadImages !== true) {
			if (RocketChat.getUserPreference(user, 'autoImageLoad') === false) {
				return false;
			}
			if (Meteor.Device.isPhone() && RocketChat.getUserPreference(user, 'saveMobileBandwidth') !== true) {
				return false;
			}
		}
		return true;
	},
	getImageHeight(height = 200) {
		return height;
	},
	color() {
		return colors[this.color] || this.color;
	},
	collapsed() {
		if (this.collapsed != null) {
			return this.collapsed;
		} else {
			const user = Meteor.user();
			return RocketChat.getUserPreference(user, 'collapseMediaByDefault') === true;
		}
	},
	time() {
		const messageDate = new Date(this.ts);
		const today = new Date();
		if (messageDate.toDateString() === today.toDateString()) {
			return moment(this.ts).format(RocketChat.settings.get('Message_TimeFormat'));
		} else {
			return moment(this.ts).format(RocketChat.settings.get('Message_TimeAndDateFormat'));
		}
	},
	injectIndex(data, previousIndex, index) {
		data.index = `${ previousIndex }.attachments.${ index }`;
	},

	isFile() {
		return this.type === 'file';
	}
});

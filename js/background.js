var notifPoped = null;
var ajax_call = function() {
	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/helix/streams?user_login=fantabobshow",
		headers: {'Client-ID': '74r6k01pksoouztdb23pc8483p6uf1'},
		dataType: 'json',
		success: function(data){
			chrome.extension.getBackgroundPage().console.log("dans le success" + notifPoped);
			chrome.extension.getBackgroundPage().console.log('data length' + data.data.length);
			if (data.data.length > 0 && notifPoped != true) {
				var isOnline = data.data[0].type;
				var streamTitle = data.data[0].title;
				notifPoped = true;
				var notification = chrome.notifications.create(
					'Stream on',{   
						type: 'basic',
						requireInteraction: true,
						iconUrl: 'img/gm.png', 
						title: "Stream Live !", 
						message: "Cheers love! The stream's here ! \n" + streamTitle
					},

					);
			}
			else if (data.data.length == 0){
				notifPoped = false;
			}
		},
		error: function(resultat, statut, erreur){
			console.log('error');
		}

	});
};
var interval = 1000 * 60 * 0.1;
setInterval(ajax_call, interval);
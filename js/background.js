var notifPoped = null;
var ajax_call = function() {
	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/helix/streams?user_login=khyarn",
		headers: {'Client-ID': '74r6k01pksoouztdb23pc8483p6uf1'},
		dataType: 'json',
		success: function(data){
			if (data.data.length > 0 && notifPoped != true) {
				chrome.browserAction.setBadgeText({text : "LIVE"});
				chrome.browserAction.setBadgeBackgroundColor({color: "#2ded2d"});
				var isOnline = data.data[0].type;
				var streamTitle = data.data[0].title;
				notifPoped = true;
				var notification = new Notification("Stream On!", {
					icon: 'img/gm.png',
					body: "Cheers love! The stream's here ! \n https://www.twitch.tv/khyarn" + streamTitle,
					requireInteraction: true     
				});
				notification.onclick = function()
				{
					var URL = "https://www.twitch.tv/kittykathee";
					window.open(URL, '_blank');
					this.close();
				}
			}

			else if (data.data.length == 0){
				notifPoped = false;
				chrome.browserAction.setBadgeText({text : ""});
				chrome.browserAction.setBadgeBackgroundColor({color: ""});
			}
		},
		error: function(resultat, statut, erreur){
			console.log('error');
		}

	});
};
var interval = 1000 * 60 * 0.1;
setInterval(ajax_call, interval);
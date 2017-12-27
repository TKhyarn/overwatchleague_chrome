const req = new XMLHttpRequest();
req.open('GET', 'https://overwatchleague.com/en-us/api/live-match?locale=en-us', false);
req.send(null);
if (req.status === 200 ) {
	var myData = JSON.parse(req.responseText);
}
if (myData && !isNaN(myData['data']['liveMatch'])) {
	var Team1 = myData['data']['liveMatch']['competitors'][0]['name'];
	var Team2 = myData['data']['liveMatch']['competitors'][1]['name'];
	var logo1 = myData['data']['liveMatch']['competitors'][0]['logo'];
	var logo2 = myData['data']['liveMatch']['competitors'][1]['logo'];
	var currentStage = myData['data']['liveMatch']['bracket']['stage']['title'];
	var MatchDate = dateFormat(myData['data']['liveMatch']['startDate'], "dd mmm yy h:MM TT");
}
else {
	const req = new XMLHttpRequest();
	req.open('GET', 'https://api.overwatchleague.com/schedule?locale=en_US', false);
	req.send(null);
	if (req.status === 200) {
		var myData = JSON.parse(req.responseText);
		var myData_nbStages = Object.keys(myData['data']['stages']).length;
		var myData_nbMatches = 0;
		var today = new Date();
		var currentStage = null;
		var myData_current = null;
		var next_match = false;
		loop1:
		for (var i = 0; i < myData_nbStages; i++) {
			myData_nbMatches = Object.keys(myData['data']['stages'][i]['matches']).length;
			currentStage = myData['data']['stages'][i]['name'];
			loop2:
			for (var y = 0; y < myData_nbMatches; y++) {
				myData_current = myData['data']['stages'][i]['matches'][y];
				if (new Date(myData_current['startDate']) > today && myData_current['competitors'][0] != null) {
					next_match = true;
					break loop1;
				}
			}
		}
		if (next_match === true) {
			var Team1 = myData_current['competitors'][0]['name'];
			var Team2 = myData_current['competitors'][1]['name'];
			var logo1 = myData_current['competitors'][0]['logo'];
			var logo2 = myData_current['competitors'][1]['logo'];
			var MatchDate = dateFormat(myData_current['startDate'], "dd mmm yy h:MM TT");
		}
		
	}
	else {
			var error = 1;
			var Team1 = "I'm sorry but";
			var Team2 = "No match has been found";
			var logo1 = "";
			var logo2 = "";
			var currentStage = "Season off";
			var MatchDate = "See you soon";
	}

}
$("#stage span").html(currentStage);
$("#date span").html(MatchDate);

if (error == 1) {
	$("#logoA").remove();
	$("#logoB").remove();
	$("#versus").remove();

}
else  {
	$("#logoA").attr('src', logo1);
	$("#logoB").attr('src', logo2);

}
$("#teamA span").html(Team1);
$("#teamB span").html(Team2);
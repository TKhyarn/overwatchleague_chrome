const req = new XMLHttpRequest();
req.open('GET', 'https://overwatchleague.com/en-us/api/schedule', false);
req.send(null);

if (req.status !== 200) {
     alert("Error");
}
var myData = JSON.parse(req.responseText);
var myData_nbStages = Object.keys(myData['data']['stages']).length;
var myData_nbMatches = 0;
var today = new Date();
var myData_current = null;
loop1:
for (var i = 0; i < myData_nbStages; i++) {
	myData_nbMatches = Object.keys(myData['data']['stages'][i]['matches']).length;
	loop2:
	for (var y = 0; y < myData_nbMatches; y++) {
		myData_current = myData['data']['stages'][i]['matches'][y];
		if (new Date(myData_current['startDate']) > today) {
			break loop1;
		}

	}
}

var Team1 = myData_current['competitors'][0]['name'];
var Team2 = myData_current['competitors'][1]['name'];
var logo1 = myData_current['competitors'][0]['logo'];
var logo2 = myData_current['competitors'][1]['logo'];
var MatchDate = dateFormat(myData_current['startDate'], "dd mmm yy h:MM TT");
var teams = Team1 +" VS " + Team2;
document.getElementById("startDate").innerHTML = MatchDate;
document.getElementById('logo1').src = logo1;
document.getElementById("teams").innerHTML = teams;
document.getElementById('logo2').src = logo2;

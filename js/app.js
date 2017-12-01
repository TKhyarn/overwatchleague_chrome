const req = new XMLHttpRequest();
req.open('GET', 'https://secret_url.com', false);
req.send(null);

if (req.status !== 200) {
     alert("Tout cassé");
}
var myData = JSON.parse(req.responseText);
var NextMatchData = myData['data']['stages'][0]['matches'][0];
var Teams = {
    "First team":
        {"name": NextMatchData['competitors'][0]['name'],
         "logo": NextMatchData['competitors'][0]['logo'],
         },
    "Second team":
        {"name": NextMatchData['competitors'][1]['name'],
         "logo": NextMatchData['competitors'][1]['logo'],
         },
    "Score":
        {"teamOne": NextMatchData['scores'][0],
         "teamTwo": NextMatchData['scores'][1],
         }
};
console.log(Teams);
document.getElementById('logo1').src = Teams["First team"]["logo"];
document.getElementById("team1").innerHTML = Teams["First team"]["name"];
document.getElementById("team2").innerHTML = Teams["Second team"]["name"];
document.getElementById('logo2').src = Teams["Second team"]["logo"];
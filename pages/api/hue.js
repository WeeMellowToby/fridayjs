

var bridgeIP;
export function Initialize() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "https://discovery.meethue.com/";
    xmlhttp.open("GET", theUrl);
    xmlhttp.send(null);
    var response = JSON.parse(xmlhttp.responseText);
    bridgeIP = response.internalipaddress;
    
}
export function SetLights(light,on) {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "http://"+ bridgeIP + "/api/kHwEZAGRotvQ1c3Ptmm8mskNmIya0GnRO0Uw9dbc/lights/" + light +"/state";
    xmlhttp.open("PUT", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "on": on }));
    console.log("set light status to "+ on);
}

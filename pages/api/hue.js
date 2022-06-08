

export function GetBridgeIp() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "https://discovery.meethue.com/";
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send(null);
    var response = xmlhttp.responseText;
    return response[0].internalipaddress;
    
}
export function SetLights(ip,lightId,on) {
    // generates the url for the api call
    var theUrl = "http://"+ ip + "/api/kHwEZAGRotvQ1c3Ptmm8mskNmIya0GnRO0Uw9dbc/lights/" + lightId +"/state";
    //sends the command to the bridge
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "on": on }));
}

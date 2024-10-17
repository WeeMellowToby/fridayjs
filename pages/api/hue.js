const key = `${process.env.NEXT_PUBLIC_HUE_KEY}`
export async function GetBridgeIp() {
    var xmlhttp = new XMLHttpRequest();
    var theUrl = "https://discovery.meethue.com/";
    await xmlhttp.open("GET", theUrl, true);
    var response = xmlhttp.response;
    console.log(response);
    return response[0].internalipaddress;
    
}
export function SetLights(ip,lightId,on) {
    // generates the url for the api call
    var theUrl = "http://"+ ip + "/api/" + key + "/lights/" + lightId +"/state";
    //sends the command to the bridge with a certificate attached
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", theUrl, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "on": on }));
}





var key = "e6bbc5c9664d655d989f4372b55a9577"



export async function GetWeatherHere(_callback) {
    if (navigator.geolocation) {
        const position = await getCurrentPosition()
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url,false);
        xmlhttp.send(null);
        var response = xmlhttp.responseText;
        _callback(response);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    
}
async function getCurrentPosition() {
    return await new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        )
    })
}
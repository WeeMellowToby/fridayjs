import React, {useState, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { GetWeatherHere } from "./api/weather";
import { GetBridgeIp,SetLights } from "./api/hue";
export default function Home() {
  const [lights,setLights] = useState([])
  const [lightnames,setLightnames] = useState([])
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tueday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const { speak } = useSpeechSynthesis();
  var bridgeIP = "192.168.101.53";
  useEffect(() => {
    if(listening == false) {
      commandSaid(transcript);
    }
  }, [listening])
  useEffect(() => { 
    var newlights = JSON.parse(localStorage.getItem('Friday.lights'))
    // gets the names of all the lights and puts them in an array
    var newlightnames = []
    for(var i = 0; i < newlights.length; i++) {
      newlightnames.push(newlights[i].name)
    }
    setLights(newlights)
    setLightnames(newlightnames)
    // sets the bridge ip
    //bridgeIP = GetBridgeIp();
  }, [])
  return (
    <>
    
    <div className='flex flex-col items-center justify-center w-full h-screen'>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}><div className="rounded-full  w-60 h-60 bg-cyan-300"></div></button>
    <p>{transcript}</p>

    
    </div>
    </>
  )
  function commandSaid(transcript) {
    if(transcript == "what is the date") {
      var d = new Date()
      var date = d.getDate();
      const monthName = months[d.getMonth()]
      const dayName = days[d.getDay()]
      var year = d.getFullYear();
      speak({text: "it is" + dayName + "the" + date + "of" + monthName + year});
    }
    if(transcript =="what is the weather") {
       GetWeatherHere(function (response) {
         var weather = response
         speak({text: "in " + weather.name +" it is " + Math.round(weather.main.temp) + " degrees celsius with " + weather.weather[0].main})
       });
    }
    // turn on light command
    if(transcript.includes("turn on")) {
      var light = transcript.split("turn on ")[1]
      if(lightnames.includes(light)) {
        var lightIndex = lightnames.indexOf(light)
        var lightid = lights[lightIndex].id;
        SetLights(bridgeIP,lightid,true);
      }
    }
    if(transcript.includes("turn off")) {
      var light = transcript.split("turn off ")[1]
      if(lightnames.includes(light)) {
        var lightIndex = lightnames.indexOf(light)
        var lightid = lights[lightIndex].id;
        SetLights(bridgeIP,lightid,false);
      }
    }
  }
}

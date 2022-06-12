import React, {useState, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { GetWeatherHere } from "./api/weather";
import { GetBridgeIp,SetLights } from "./api/hue";
import Spotify from "../components/spotify/Spotify";
export default function Home() {
  const [lights,setLights] = useState([])
  const [lightnames,setLightnames] = useState([])
  const [timetable,setTimetable] = useState([])
  const aliases = require('../lib/aliases.json')
  const Date = require('../lib/Date.json')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();
  var bridgeIP = "192.168.101.53";
  useEffect(() => {
    if(listening == false) {
      commandSaid(transcript);
    }
  }, [listening])
  useEffect(() => { 
    var newlights = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_LIGHT_STORAGE))
    if(newlights != null) {
    // gets the names of all the lights and puts them in an array
    var newlightnames = []
    for(var i = 0; i < newlights.length; i++) {
      newlightnames.push(newlights[i].name)
    }
    setLights(newlights)
    setLightnames(newlightnames)
    // sets the bridge ip
    //bridgeIP = GetBridgeIp();
    }
    var newtimetable = JSON.parse(localStorage.getItem(process.env.NEXT_PUBLIC_TIMETABLE_STORAGE))
    if(newtimetable != null) setTimetable(newtimetable); else setTimetable([])
  }, [])



  return (
    <>

    <div className='flex flex-col items-center justify-center w-full h-screen'>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}><div className="rounded-full  w-60 h-60 bg-cyan-300"></div></button>
    <p>{transcript}</p>
    <Spotify/>
    </div>
    </>
  )
  function WhichAliasWasSaid(command,aliases) {
    for(var i = 0; i < aliases.length; i++) {
      if(command.includes(aliases[i])) {
        return aliases[i];
      }
    }
    return null
  }
  function commandSaid(transcript) {

    if(aliases.weather.includes(transcript)) {
       GetWeatherHere(function (response) {
         var weather = response
         speak({text: "in " + weather.name +" it is " + Math.round(weather.main.temp) + " degrees celsius with " + weather.weather[0].main})
       });
    }
    // light commands
    // turn on the light
    if(WhichAliasWasSaid(transcript,aliases.turnOnLight) != null) {
      var light = transcript.split(WhichAliasWasSaid(transcript,aliases.turnOnLight) + " ")[1]
      if(lightnames.includes(light)) {
        var lightIndex = lightnames.indexOf(light)
        var lightid = lights[lightIndex].id;
        SetLights(bridgeIP,lightid,true);
        speak({text: "turning on the light" + light})
      } else {
        speak({text: "I don't know that light"})
      }
    }
    // turn off the light
    if(WhichAliasWasSaid(transcript,aliases.turnOffLight) != null) {
      console.log("turning off the light")
      var light = transcript.split(WhichAliasWasSaid(transcript,aliases.turnOffLight) + " ")[1]
      if(lightnames.includes(light)) {
        var lightIndex = lightnames.indexOf(light)
        var lightid = lights[lightIndex].id;
        SetLights(bridgeIP,lightid,false);
        speak({text: "turning off the light" + light})
      } else {
        speak({text: "I don't know that light"})
      }
    }
    // date and time commands
    if(aliases.time.includes(transcript)) {
      var d = new Date()
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var time = hours + "," + minutes;
      speak({text: "it is " + time});
    }
    if(aliases.date.includes(transcript)) {
      var d = new Date()
      var date = d.getDate();
      const monthName = Date.months[d.getMonth()]
      const dayName = Date.days[d.getDay()]
      var year = d.getFullYear();
      speak({text: "it is" + dayName + "the" + date + "of" + monthName + year});
    }
    // timetable commands
    if(aliases.lessonsToday.includes(transcript)) {
      var d = new Date()
      var date = d.getDate();
      var day = d.getDay();
      var lessons = timetable[day - 1]
      speak({text: "today your lessons are: " + lessons.LessonOne + "," + lessons.LessonTwo + "," + lessons.LessonThree + "," + lessons.LessonFour + " and " + lessons.LessonFive});
    }
  }
}

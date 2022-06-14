import React, {useState, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { GetWeatherHere } from "./api/weather";
import { GetBridgeIp,SetLights } from "./api/hue";
import { getLatestNews } from "./api/news";
import { Play,Pause } from "./api/sonos";
export default function Home() {
  const [lights,setLights] = useState([])
  const [lightnames,setLightnames] = useState([])
  const [timetable,setTimetable] = useState([])
  const [news,setNews] = useState([])
  const aliases = require('../lib/aliases.json')
  const Dates = require('../lib/Date.json')
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
      commandSaid(transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase());
    }
    
  }, [listening])
  // on page load
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
    <button onClick={SpeechRecognition.startListening} className="animate-spin-slow">{/*<div className="rounded-full  w-60 h-60 bg-cyan-300"></div> */}
    <svg width="250" height="250" stroke="url(#gradient)">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="25%" stopColor="#c2410c" />
          <stop offset="50%" stopColor="#c2410c" />
          <stop offset="75%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>
     <circle cx="50%" cy="50%" r="100" strokeWidth="4" fill="none" />
      <circle cx="50%" cy="50%" r="75" strokeWidth="2" fill="none"/>
     
    </svg>
      </button>
    <p>{transcript}</p>
    {news.length ? <button onClick={ReadMore}>Read More</button> : null}
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
      const monthName = Dates.months[d.getMonth()]
      const dayName = Dates.days[d.getDay()]
      var year = d.getFullYear();
      speak({text: "it is" + dayName + "the" + date + "of" + monthName + year});
    }
    // timetable commands
    if(aliases.lessonsToday.includes(transcript)) {
      var d = new Date()
      var day = d.getDay();
      var lessons = timetable[day - 1]
      speak({text: "today your lessons are: " + lessons.LessonOne + "," + lessons.LessonTwo + "," + lessons.LessonThree + "," + lessons.LessonFour + " and " + lessons.LessonFive});
    }
    // news commands
    if(aliases.news.includes(transcript)) {
      NewsCommand();
    }
    // sonos
    if(aliases.playMusic.includes(transcript)) {
      Play("House1");
    }
    if(aliases.stopMusic.includes(transcript)) {
      Pause("House1");
    }
  }
  async function NewsCommand() {
    var Newnews = await getLatestNews()
    setNews(Newnews);
    var differentlyPunctuatedTitle = Newnews[0].title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,",,,");
    speak({text: "the latest news is: ..." + differentlyPunctuatedTitle + "... Would you like to read it?"});
  }
  function ReadMore() {
    console.log(news[0].content)
    speak({text: news[0].content})
  }
  
}

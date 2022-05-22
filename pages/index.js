import React, {useState, useEffect} from "react";
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import { useSpeechSynthesis } from 'react-speech-kit';
import { GetWeatherHere } from "./api/weather";
export default function Home() {
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
  useEffect(() => {
    if(listening == false) {
      if(transcript == "what is the date") {
        var d = new Date()
        var date = d.getDate();
        const monthName = months[d.getMonth()]
        const dayName = days[d.getDay()]
        var year = d.getFullYear();
        console.log("it is " + dayName + " the " + date + " of " + monthName + " " + year);
        speak({text: "it is" + dayName + "the" + date + "of" + monthName + year});
      }
      if(transcript =="what is the weather") {
         GetWeatherHere(function (response) {
           var weather = JSON.parse(response)
           speak({text: "in " + weather.name +" it is " + weather.main.temp + " degrees celsius with " + weather.weather[0].main})
         });
      }
    }

  }, [listening])
  
  return (
    <>
    
    <div className='flex flex-col items-center justify-center w-full h-screen'>
    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}><div className="rounded-full  w-60 h-60 bg-cyan-300"></div></button>
    <p>{transcript}</p>

    
    </div>
    </>
  )
}

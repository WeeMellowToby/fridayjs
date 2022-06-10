import React from 'react'
import Day from './Day'
export default function Table({timetable, removeDay}) {
  return (
      timetable?.map(day => {
          return <Day key={day.DayName} day={day} removeDay={removeDay}/>
          
      })
  )
}

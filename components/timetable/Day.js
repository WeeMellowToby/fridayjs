import React from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri'
function Day({day, removeDay}) {
    const removeToday = () => {
        removeDay(day.id)
    }
  return (
    <tr>
        <td className='border-4'>{day.DayName}</td>
        <td className='border-4'>{day.LessonOne}</td>
        <td className='border-4'>{day.LessonTwo}</td>
        <td className='border-4'>{day.LessonThree}</td>
        <td className='border-4'>{day.LessonFour}</td>
        <td className='border-4'>{day.LessonFive} &nbsp;<button onClick={removeToday}><RiDeleteBin5Fill/></button></td>
    </tr>
  )
}

export default Day
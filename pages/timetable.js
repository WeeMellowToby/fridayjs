import React, { useRef } from 'react'
import { useEffect } from 'react'
import { uid } from 'react-uid'
import Table from '../components/timetable/Table'
function Timetable() {
    const [timetable, setTimetable] = React.useState([])
    const LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_TIMETABLE_STORAGE
    var DayNameRef = useRef()
    var LessonOneRef = useRef()
    var LessonTwoRef = useRef()
    var LessonThreeRef = useRef()
    var LessonFourRef = useRef()
    var LessonFiveRef = useRef()
    useEffect(() => { 
        const storedTimetable = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if(storedTimetable != []) setTimetable(storedTimetable); else setTimetable([])
    } ,[])
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timetable));
        console.log(timetable);
    }, [timetable])
    const addDay = () => {
        const DayName = DayNameRef.current.value;
        const LessonOne = LessonOneRef.current.value;
        const LessonTwo = LessonTwoRef.current.value;
        const LessonThree = LessonThreeRef.current.value;
        const LessonFour = LessonFourRef.current.value;
        const LessonFive = LessonFiveRef.current.value;
        if(DayName === '') return
        DayNameRef.current.value = null;
        LessonOneRef.current.value = null;
        LessonTwoRef.current.value = null;
        LessonThreeRef.current.value = null;
        LessonFourRef.current.value = null;
        LessonFiveRef.current.value = null;
        const Day = {"id":uid(DayName) ,"DayName": DayName, "LessonOne": LessonOne, "LessonTwo": LessonTwo, "LessonThree": LessonThree, LessonFour: LessonFour, LessonFive: LessonFive};
        setTimetable(prevTimetable => {
             if (prevTimetable != null) return [...prevTimetable, Day]; else return [Day];
            })
    }
    function removeDay(id) {
        const newTimeTable = timetable.filter(Day => Day.id != id);
        setTimetable(newTimeTable);
    }
  return (
    <div className='ml-20 mt-4'>
        <table>
            <thead>
                <tr>
                    <th className='border-4 border-orange-400'>Day</th>
                    <th className='border-4 border-orange-400'>Lesson 1</th>
                    <th className='border-4 border-orange-400'>Lesson 2</th>
                    <th className='border-4 border-orange-400'>Lesson 3</th>
                    <th className='border-4 border-orange-400'>Lesson 4</th>
                    <th className='border-4 border-orange-400'>Lesson 5</th>
                </tr>
            </thead>
            <tbody>
            <Table timetable={timetable} removeDay={removeDay}/>
            <tr>
            <td className='border-4 border-orange-400'><input type="text" placeholder="day" ref={DayNameRef} className='bg-gray-700 text-white'/></td>
            <td className='border-4 border-orange-400'><input type="text" placeholder="Lesson 1" ref={LessonOneRef} className='bg-gray-700 text-white'/></td>
            <td className='border-4 border-orange-400'><input type="text" placeholder="Lesson 2" ref={LessonTwoRef} className='bg-gray-700 text-white'/></td>
            <td className='border-4 border-orange-400'><input type="text" placeholder="Lesson 3" ref={LessonThreeRef} className='bg-gray-700 text-white'/></td>
            <td className='border-4 border-orange-400'><input type="text" placeholder="Lesson 4" ref={LessonFourRef} className='bg-gray-700 text-white'/></td>
            <td className='border-4 border-orange-400'><input type="text" placeholder="Lesson 5" ref={LessonFiveRef} className='bg-gray-700 text-white'/></td>
            </tr>
            </tbody>
        </table>
        <div className="content-center">
        <button onClick={addDay} >
             Add Day
        </button>
        </div>
    </div>
  )
}
export default Timetable
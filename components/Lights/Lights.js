import React, { useState, useRef, useEffect } from 'react'
import LightList from './LightList'


export default function Lights() {
  const [lights,setLights] = useState([])
  const lightNameRef = useRef()
  const lightIdRef = useRef()
  const LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_LIGHT_STORAGE
// get from local storage
useEffect (() => {
const storedLights = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
if(storedLights != []) setLights(storedLights);
},[]);
// save to local storage
useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lights));
}, [lights])

function removeLight(id) {
    const newLights = lights.filter(light => light.id != id);
    setLights(newLights);
}
// adds a light to the list
  function handleAddLight(e) {
      const name = lightNameRef.current.value;
      const id = lightIdRef.current.value;
      if(name === '') return
      lightNameRef.current.value = null
      lightIdRef.current.value = null
      setLights(prevLights => {
          return[...prevLights,{id: id, name: name}]
      })
  }
  // retruns the list of lights and a form
  return (
    <>
    
    <label>Light name</label>
    <input ref={lightNameRef} type="text" className='border-2'/>
    <label>Light id</label>
    <input ref={lightIdRef} type="number" className='border-2'/>
    <button onClick={handleAddLight}>Add Light</button>
    <LightList lights={lights} removeLight={removeLight}/>
    </>
  )
}

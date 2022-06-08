import React from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri'
export default function Light({light,removeLight}) {
    function handleLightRemove() {
        removeLight(light.id)
    }
  return (
    <div>
        name: {light.name} id: {light.id} <button onClick={handleLightRemove}><RiDeleteBin5Fill/></button>
        
    </div>
  )
}

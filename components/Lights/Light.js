import React from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri'
export default function Light({light,removeLight}) {
    function handleLightRemove() {
        removeLight(light.id)
    }
  return (
    <>
        <td className='border-4'>{light.id}</td><td className='border-4'>{light.name} <button onClick={handleLightRemove} className='pt-1'><RiDeleteBin5Fill size="16"/></button></td>
        
    </>
  )
}

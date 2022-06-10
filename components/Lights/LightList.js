import React from 'react'
import Light from './Light'
export default function LightList({ lights, removeLight }) {
  return (
      lights?.map(light => {
          return <div key={light.id.toString()}>
          <Light light={light}  removeLight={removeLight}/>
          </div>
          
      })
  )
}

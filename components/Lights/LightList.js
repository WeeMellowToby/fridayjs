import React from 'react'
import Light from './Light'
export default function LightList({ lights, removeLight }) {
  return (
      lights?.map(light => {
          return <tr key={light.id.toString()}>
          <Light light={light}  removeLight={removeLight}/>
          </tr>
          
      })
  )
}

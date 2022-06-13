import React from 'react'
import Link from 'next/link'
export default function Music() {
  return (
    <div className='ml-20 mt-4'>
        <h1>Music with sonos</h1>
        <p>to use music with sonos you will have to follow the instructions here: </p>
        <br/>
        <Link href="https://github.com/jishi/node-sonos-http-api">
            <a>https://github.com/jishi/node-sonos-http-api</a>
        </Link>
        <br/>
        <p>once set up you can put in the group you want to control and the ip address of the device</p>
        <input />
    </div>
  )
}

import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import {BsFillLightbulbFill} from 'react-icons/bs'
import {MdOutlineAccessTimeFilled} from 'react-icons/md'
import Link from 'next/link'
function SideBar() {
  return (
    <div className='flex fixed top-0 h-screen w-16 flex-col bg-gray-700 text-white shadow-lg'>
      <Link href='/'>
        <a>
        <SideBarIcon icon={<AiFillHome size="58"/>} text="Home"/>
        </a>
      </Link>
      <Link href='/lights'>
        <a>
        <SideBarIcon icon={<BsFillLightbulbFill size="58"/>} text="Lights using Hue"/>
        </a>
      </Link>
      <Link href='/timetable'>
        <a>
        <SideBarIcon icon={<MdOutlineAccessTimeFilled size="58"/>} text="add/edit your school timetable"/>
        </a>
      </Link>
    </div>
  )
}
const SideBarIcon = ({icon, text}) => (
    <div className='sidebar-icon group'>
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </div>
)

export default SideBar
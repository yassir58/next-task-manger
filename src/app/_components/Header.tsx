'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { MdTaskAlt } from "react-icons/md"

interface props {

}

const Header:React.FC<props> = ({})=> {

    const {data:session} = useSession ()
  return (
    <div className='flex justify-between px-6 py-2'>
        <div className='flex gap-3'>
        <MdTaskAlt fontSize='20px' />
        <p>TaskManager</p>
        </div>
        <div className='flex gap-6'>
            <button className='rounder-full px-4 py-2 bg-[#2A2D32] text-red-400'>logout</button>
            <p>{session?.user.name}</p>
        </div>
    </div>
  )
}

export default Header
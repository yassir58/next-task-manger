'use client'
import React, { createContext, useState } from "react";
import { MdSettings } from "react-icons/md";
import { Card } from "./Cards";
import { RxCross1 } from "react-icons/rx";
interface modalContext {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
export const modalContext = createContext<modalContext>({});

interface modalWrapperProps {
    variant?:string 
    cardModal: boolean
    children:React.ReactNode,
    value?:any
    component?:any
    title:string
    size?:string
}

const Modal:React.FC<modalWrapperProps> = ({variant, value, size = 'sm', title, children, cardModal}) => {

  const [isOpen, setIsOpen] = useState (false)
  const onOpen = () => setIsOpen (true)
  const onClose = () => setIsOpen (false)
  const sizesMap = new Map ()

  sizesMap.set ("sm", "350px")
  sizesMap.set ("md", "450px")
  sizesMap.set ("lg", "550px")
  sizesMap.set ("xl", "650px")



  return<>
  <button className={`${variant}`} onClick={onOpen}>{value}</button>
  <div className={`${isOpen ? 'block': 'hidden'} z-30 top-0 left-0 fixed w-[100vw] h-[100vh] flex justify-center items-center`}>
   <div className="w-[100vw] h-[100vh] top-0 left-0  bg-black/75 " onClick={onClose}></div>
   <div className='fixed w-[vw] h-[100vh] flex justify-center items-center'>
   <div className={`w-[${sizesMap.get (size)}] max-w-[${sizesMap.get (size)}] h-auto bg-white fixed  z-50 rounded-md max-h-[650px] overflow-y-auto px-6 py-3 `}>
    <div className='w-full py-4 flex justify-between items-center'>
      <p className='text-md font-semibold text-black'>{title}</p>
     <RxCross1 className='text-mediumGray hover:scale-105' onClick={onClose}/>
    </div>
    <div className="flex flex-col pt-6 w-full h-auto">
    <modalContext.Provider value={{onClose}}>
    {children}
    </modalContext.Provider>
    </div>
   </div>
   </div>
  </div>
  </>
}

export default Modal
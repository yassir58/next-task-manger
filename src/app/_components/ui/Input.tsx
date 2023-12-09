'use client'
import React from "react";
import { taskStatus } from "../../../../constants"
import { GoDotFill } from "react-icons/go";
import { Select, Icon } from "@chakra-ui/react";
interface props {
    input:string,
    setInput:(value:string) => void, 
    placeHolder: string,
    handleEnter: (e:any) => void
}
const Input:React.FC<props> = ({input, setInput, placeHolder, handleEnter})=>{

   
    return ( <input
    onKeyDown={handleEnter}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-[#2A2D32]  outline-none focus:outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-sm drop-shadow-sm text-[#A7A29F] px-4 py-2 rounded-[12px] w-[98%]"
        placeholder={placeHolder}
      />)
}

interface SelectProps {
    setStatus: (status:TaskType) => void
}


export const  SelectInput:React.FC<SelectProps> =({setStatus})=> {
 

  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
        <Select
          placeholder="Status"
          color={'#D6E4FC'}
          bg={'#222429'}
        >
          {taskStatus.map((task:TaskStatus, index:number) => (
            <option key={index}  onClick={() => setStatus (task.status)}>
               <div className="flex gap-3 justify-start items-center">
            <Icon as={GoDotFill} fontSize='16px' color={'red'}/>
            <p className='font-semi-bold text-[#C4C1BB] text-sm'>{task.label}</p>
        </div>
            </option>
          ))}
        </Select>
    </div>  
  );
}

export default Input

import {HStack} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa6'
import { ModalWrapper } from './ui/Modal'
import { AddTask } from './AddTask'
import { usePathname } from 'next/navigation'
import { trpc } from '../_trpc/client'
interface props {
    board: any
}

const BoardHeader:React.FC<props> = ({board}) => {

    const pathname = usePathname ()
    const boardId = pathname.split("/")[4];
    
    return (
        <HStack w="100%" justifyContent={"space-between"} alignItems={"center"} px={4} py={4}>
        <HStack spacing={3}>
            <div className={`bg-gradient-to-r from-[#B06AB3] to-[#4568DC] rounded-md  text-[#DAD4CD]  px-[1px] py-[1px] font-bold`}>
              <div className='bg-[#2A2D32]  w-full h-full px-4 py-2 rounded-md'>
              {board ? board!.name : ''}
              </div>
            </div>
        </HStack>
  
        <HStack spacing={4} >
        <ModalWrapper
            title="Create task"
            value={
              <div className="flex gap-4">
                <p className="text-sm">add task</p>
                <FaPlus fontSize="16px" />
              </div>
            }
            variant='regular'
          >
            <AddTask boardId={boardId!} />
          </ModalWrapper>
         
        </HStack>
      </HStack>
    )
}

export default BoardHeader
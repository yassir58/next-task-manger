import { usePathname } from "next/navigation"
import { trpc } from "../_trpc/client"
import { FaCross } from "react-icons/fa6"
import toast from "react-hot-toast"
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
interface props {
    board: any
}


const EditBoard:React.FC<props> = ({board}) => {

    const pathname = usePathname ()
    const [name, setName] = useState ('')
    const utils = trpc.useUtils ()
    const boardId = pathname.split ('/')[4]
  
    const {data:columns} = trpc.columnRouter.getAll.useQuery ({
        boardId:boardId!
    })
    const editBoardMutation = trpc.boardRouter.updateBoard.useMutation ({
        onSuccess : () => {
            toast.success ('Board edited successfully')
            utils.boardRouter.invalidate ()
    }
    })
    const deleteColumnMutation = trpc.columnRouter.deleteColumn.useMutation ({
        onSuccess : () => {
                toast.success ('Column deleted successfully')
                utils.boardRouter.invalidate ()
                utils.columnRouter.invalidate ()
        }
    })

    const deleteColumn = (id:string) => {

        deleteColumnMutation.mutateAsync ({
            id: id
        })
    }

    const updateBoard = () => {
        editBoardMutation.mutateAsync ({
            boardId: boardId!,
            name: name
        })
    }
    return (<div className='flex flex-col gap-5 min-w-[25vw]'>
        <p className='text-lg font-semibold text-veryDarkGray'>{board?.name}</p>
        <input className="input-regular" placeholder="New board title"value={name} onChange={(e) => setName (e.target.value)} />
        <p className="text-md font-semibold text-mediumGray">Columns</p>
        <div className="flex flex-col gap-2">
            {columns && columns.map ((column, index) => {
                return <button className='btn-del-col group'>
                    {column.name}
                    <RxCross2 className='text-mainRed group-hover:block hover:scale-105 hidden  text-[18px]' onClick={() => deleteColumn (column.id)} />
                </button>
            })}
        </div>
        <button className='btn-primary' onClick={updateBoard}>Update board</button>
    </div>)
}

export default EditBoard
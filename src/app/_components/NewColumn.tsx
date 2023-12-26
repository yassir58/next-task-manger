import { useState } from "react"
import { trpc } from "../_trpc/client"
import toast from "react-hot-toast"
import { getRandomColor } from "~/utils/randomColor"
import { modalContext } from "./ui/Modal"
import { useContext } from "react"


interface props {
    boardId:string
}
const NewColumn:React.FC<props> = ({boardId}) => {

    const [title, setTitle] = useState ('')
    const {onClose} = useContext (modalContext)
    const [color] = useState (getRandomColor ())
    const utils = trpc.useUtils ()
    const newColumnMutation = trpc.columnRouter.createColumn.useMutation ({
        onSuccess: () => {
          toast.success ("Column created successfully")
          utils.columnRouter.invalidate ()
        }
      })
    
      const newColumn = () => {
        newColumnMutation.mutateAsync({
          boardId: boardId,
          title: title,
          color:color,
        })
      }
    return (<div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-darkGray font-semibold">Column title</label>
                <input className='input-regular' placeholder="your column title" id='title' onChange={(e) => setTitle (e.target.value)}/>
            </div>
            <button className='btn-primary' onClick={()=> {
                newColumn ()
                setTitle ('')
                onClose! ()
            }}>create column</button>
    </div>)
}

export default NewColumn
import { useRef, useState } from "react"
import { trpc } from "../_trpc/client"
import toast from "react-hot-toast"
import { getRandomColor } from "~/utils/randomColor"
import { modalContext } from "./ui/Modal"
import { useContext } from "react"
import { MdColorLens } from "react-icons/md";

interface props {
    boardId:string
}
const NewColumn:React.FC<props> = ({boardId}) => {

    const [title, setTitle] = useState ('')
    const {onClose} = useContext (modalContext)
    const [color, setColor] = useState (getRandomColor ())
    const colorRef = useRef<HTMLInputElement> (null)
    const utils = trpc.useUtils ()
    const newColumnMutation = trpc.columnRouter.createColumn.useMutation ({
        onSuccess: () => {
          toast.success ("Column created successfully")
          utils.columnRouter.invalidate ()
          setTitle ('')
          onClose && onClose ()
        }
      })
    
      const newColumn = () => {
        newColumnMutation.mutateAsync({
          boardId: boardId,
          title: title,
          color:color,
        })
      }
      const handleClick = () => {
        if (colorRef.current)
          colorRef?.current?.click ()
      }

    return (<div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-darkGray font-semibold dark:text-white">Column title</label>
                <input className='input-regular' placeholder="your column title" id='title' onChange={(e) => setTitle (e.target.value)}/>
                <input className='hidden' ref={colorRef} onChange={(e)=> setColor (e.target.value)} type='color' />
                <button className="btn-action flex justify-between items-center" onClick={handleClick}>
                  <p>Set Color</p>
                  <MdColorLens/>
                </button>
            </div>
            <button className='btn-primary' onClick={()=> {
                newColumn ()
            }}>create column</button>
    </div>)
}

export default NewColumn
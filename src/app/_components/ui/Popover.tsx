import { useState } from "react"
import { RxCross1 } from "react-icons/rx"

interface props {
    variant:string
    value: any
    children:React.ReactNode
    title:string,
    position:string
}
const Popover:React.FC<props> = ({variant, value, children, title, position}) => {

    const [visible, setVisible] = useState (false) 
    const positionMap = new Map ()

    positionMap.set ("top", "-top-48 left-6");
    positionMap.set ("bottom", "top-10 -left-60");

    const onClose = () => setVisible (false)
    const onOpen = () => setVisible (true)
    return (<div className="relative">
    <button className={variant} onClick={onOpen}>
        {value}
    </button>
<div className={`${visible ? 'flex' : 'hidden'} flex-col gap-4 bg-white px-4 pt-2 pb-4 shadow-lg rounded-md z-50 absolute ${positionMap.get (position)}  min-w-[300px] max-h-[500px] overflow-y-auto`}>
<div className='w-full py-4 flex justify-between items-center'>
      <p className='text-md font-semibold text-black'>{title}</p>
     <RxCross1 className='text-mediumGray hover:scale-105' onClick={onClose}/>
    </div>
    {children}
</div>
    </div>)
}

export default Popover
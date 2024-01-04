
'use client'
import { useContext } from "react";
import { BiShow } from "react-icons/bi";
import { sideNavContext } from "../context/contexts";
const SideNavButton:React.FC = ({}) => {

    const {visible, setVisible} = useContext (sideNavContext)
    return <button className={`bottom-16 w-[56px] h-[42px] rounded-r-full  lef-0 fixed ${visible ? 'hidden': 'flex'} justify-center items-center bg-mainPurple text-white hover:bg-secondaryPurple`} onClick={() => setVisible && setVisible (true)}>
        <BiShow />
    </button>
}

export default SideNavButton


import { useState } from "react"
import { sideNavContext } from "../context/contexts"
interface props {
children:React.ReactNode
}
const SideNavProvider:React.FC<props> = ({children}) => {

    const [visible, setVisible] = useState (true);
    return <sideNavContext.Provider value={{visible, setVisible}}>
            {children}
    </sideNavContext.Provider>
}

export default SideNavProvider
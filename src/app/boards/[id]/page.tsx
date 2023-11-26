import { usePathname } from "next/navigation"


interface props {}

const page:React.FC<props> = ({}) =>{

    const pathname = usePathname ()
    return (<div>
        <p>{pathname}</p>
    </div>)
}

export default page
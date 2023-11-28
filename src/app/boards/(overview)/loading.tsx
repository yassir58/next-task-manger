import { LoaderIcon } from "react-hot-toast"
interface props {}
const loader:React.FC<props> = ({}) =>{
    return (<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <LoaderIcon />
   </main>)
}

export default loader
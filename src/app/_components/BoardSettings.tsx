import { usePathname, useRouter } from "next/navigation"

interface props {

}
const BoardSettings:React.FC<props> = ({}) => {

    const settingsMap = new Map ()
    const pathname = usePathname ()
    const workspaceId = pathname.split ('/')[2] ;
    const router = useRouter ()
    const settingsArray = ["Go to workspace", "See all workspaces"]

    settingsMap.set ("Go to workspace", {type:'link', href:`/w/${workspaceId}`})
    settingsMap.set ("See all workspaces", {type:'link', href:'/'})
    return (<div className='flex flex-col justify-start items-start gap-2'>
        {settingsArray.map ((item, index) => {
            if (settingsMap.get (item).type === 'link')
                return <button className="btn-link" onClick={() => router.replace (settingsMap.get(item).href)} key={index}>{item}</button>
        })}
    </div>)
}

export default BoardSettings
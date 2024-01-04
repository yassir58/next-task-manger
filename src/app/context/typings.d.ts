
type User = {
    name?: string
    email?: string
    profileImage?: string
    id?: string
    Board?: Board[]
}
type authContext  = {
    isAuth?:boolean
    setIsAuth?: (val:boolean) => void
    loggedInUser?:User
    setLoggedInUser?: (user:User) => void
}

type Board = {
    name: string
    tasks: Task[]
}

type TaskStatus = {
    label:string,
    status:TaskType,
    color:string
}
type TaskType = "backlog" | "in-review" | "in-progress" | "completed"
type Task= {
    id:string,
    content: string,
    status: TaskType,
    coverImage:string,
    Description:string
}

type Workspace = {
    id: string
    visibility: string
    image: string
    name: string
}

type SubTask = {
    id: string
    content: string
    done: boolean
}

type _Comment = {
    id: string
    content: string
    userId: string
    taskId: string
    createdAt:string
}

type Attachment = {
    id: string
    name: string
    path: string
    taskId: string
    createdAt:string
}


type Invite  = {
    id          : string
    createdAt   : string
    updateAt    : string
    ownerId     : string
    receiverId  : string
    workspaceId : string
}

type sideNavContext = {
    visible?: boolean
    setVisible?: (value:boolean) => void
}

type User = {
    name?: string
    email?: string
    image?: string
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
    status: TaskType
}

type Workspace = {
    id: string
    visibility: string
    image: string
    name: string
}
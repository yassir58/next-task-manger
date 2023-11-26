
type User = {
    name?: string
    email?: string
    image?: string
    id?: string
}
type authContext  = {
    loggedInUser?:User
    setLoggedInUser?: (user:User) => void
}
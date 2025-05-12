import { CartItem } from "./CartItem"

interface User {
    username: string,
    password: string,
    cart?: CartItem[]
}

export default User
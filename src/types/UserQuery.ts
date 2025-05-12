import { CartItem } from "./CartItem"

interface UserQuery {
    id: string,
    token: string,
    cartItem?: CartItem
}

export default UserQuery
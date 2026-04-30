import { CartItem } from "./CartItem"

interface UserQuery {
    id: string,
    token: string,
    cartItem?: CartItem,
    cart?: CartItem[],
    sessionId?: string
}

export default UserQuery
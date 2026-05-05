import { CartItem } from "./CartItem"
import OrderHistoryItem from "./OrderHistory"

interface User {
    username: string,
    password: string,
    cart?: CartItem[],
    orderHistory?: OrderHistoryItem[]
}

export default User
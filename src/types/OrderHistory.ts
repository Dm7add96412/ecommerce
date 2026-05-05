export interface OrderHistoryCartItem {
    title: string,
    price: number,
    quantity: number
}

interface OrderHistoryItem {
    cart: OrderHistoryCartItem[],
    id: string,
    date: string
}

export default OrderHistoryItem
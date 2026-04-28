import { CartItem } from "../types/CartItem";

export function ifInCartQuantity(cart: CartItem[] | undefined, productId: string, productName: string) {
        if (cart) {
        const foundItem = cart.find(item => item.id === productId.toString() && item.title === productName)
        if (foundItem) {
            return foundItem.quantity
        }
    }
}
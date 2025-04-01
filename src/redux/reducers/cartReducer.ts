import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/CartItem";
import Product from '../../types/Product';

const initialState : CartItem[] = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload.id)
            if(foundIndex != -1) {
                state[foundIndex].quantity++
            } else {
                const cartItem: CartItem = { ...action.payload, quantity: 1 }
                state.push(cartItem)
            }
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const foundIndex = state.findIndex(item => item.id === action.payload.id)
            if(foundIndex != -1) {
                if(state[foundIndex].quantity === 1) {
                    state.splice(foundIndex, 1)
                } else {
                    state[foundIndex].quantity--
                }   
            }
        }
    }
})

const cartReducer = cartSlice.reducer

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartReducer
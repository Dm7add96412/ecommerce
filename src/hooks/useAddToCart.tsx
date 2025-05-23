import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { CartItem } from "../types/CartItem"
import Product from "../types/Product"
import { useFetchUserQuery, useUpdateUserMutation } from "../redux/api/userApi"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"

const useAddToCart = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)
    const { data, isError } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        } 
    }, [authUserId, authToken])

    const addToCart = useCallback(
        async (product: Product) => {
            const id = product.id.toString()
            if (isError) {
                console.log('Error fetching user data / timeout')
                setToken('')
                setUserId('')
                dispatch(logoutAuth())
                navigate('/login')
            }
            if (data && data.cart) {
                const foundItem = data.cart.find(item => item.id === id)
                if (foundItem) {
                const updatedItem: CartItem = { ...foundItem, quantity: foundItem.quantity + 1 }
                await updateUser({ id: userId, token, cartItem: updatedItem })
                } else {
                    const newItem: CartItem = { ...product, quantity: 1 }
                    await updateUser({ id: userId, token, cartItem: newItem })
            }
            }
        },
        [data, updateUser, userId, token, isError, navigate, dispatch]
    )
    return addToCart
}

export default useAddToCart
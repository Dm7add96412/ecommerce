import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { CartItem } from "../types/CartItem"
import Product from "../types/Product"
import { useFetchUserQuery, useUpdateUserMutation } from "../redux/api/userApi"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"

const useAddToCart = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)
    const { data, isError, error, isFetching } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        }
    }, [authUserId, authToken])

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                window.alert(error.data.error)
            } else {
                window.alert('Error fetching user data / timeout')
            }
            setUserId('')
            setToken('')
            dispatch(logoutAuth())
            navigate('/login')
        }
    }, [isError, data, isFetching, navigate, dispatch, error])

    const addToCart = useCallback(
        async (product: Product) => {
            const id = product.id.toString()
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
        [data, updateUser, userId, token]
    )
    return addToCart
}

export default useAddToCart
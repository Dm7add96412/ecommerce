import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { CartItem } from "../types/CartItem"
import Product from "../types/Product"
import { useFetchUserQuery, useUpdateUserMutation } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"
import useAuthenticate from "./useAuthenticate"

const useAddToCart = () => {
    const navigate = useNavigate()
    const { token, userId, logOut } = useAuthenticate()
    const [ fetchError, setFetchError ] = useState<string>('')
    const { data, isError, error, isFetching } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                console.log("test")
                setFetchError(error.data.error)
              /*   alert(error.data.error) */
            } else {
                setFetchError('Error fetching user data / timeout')
              /*   alert('Error fetching user data / timeout') */
            }
            setTimeout(() => {
                dispatch(logoutAuth())
                logOut()
                navigate('/login')
            }, 3000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, logOut])

    const addToCart = useCallback(
        async (product: Product) => {
            const id = product.id.toString()
            const title = product.title
                if (data && data.cart) {
                    const foundItem = data.cart.find(item => item.id === id && item.title === title)
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
    return { addToCart, fetchError }
}

export default useAddToCart
import { useEffect, useState } from "react"
import useAppSelector from "./useAppSelector"

const useAuthenticate = () => {
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        }
    }, [authUserId, authToken])

    const logOut = () => {
        setToken('')
        setUserId('')
    }

    return { token, userId, logOut }
}

export default useAuthenticate
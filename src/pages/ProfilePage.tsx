import { Alert, Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import useAppSelector from "../hooks/useAppSelector"

const ProfilePage = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [fetchError, setFetchError] = useState<string>('')
    const dispatch = useAppDispatch()
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)

    const { data, isError, isFetching } = useFetchUserQuery(
        { id: userId, token: token }
    )
    
    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        } 
    }, [authUserId, authToken])

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            setFetchError('Error fetching user data / timeout')
            setTimeout(() => {
                setUserId('')
                setToken('')
                setFetchError('')
                dispatch(logoutAuth())
                navigate('/login')
            }, 5000)
        }
    }, [isError, data, isFetching, navigate, dispatch])

    const logOut = () => {
        dispatch(logoutAuth())
        setToken('')
        setUserId('')
        navigate('/login')
    }

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            padding: 1,
            alignItems: 'center',
            gap: 1.5 }}>
            <Typography variant="h5">PROFILE PAGE</Typography>
            <Typography>This is the profile page of <u>{data?.username}</u></Typography>
            <Button variant='contained' onClick={logOut}>Logout</Button>
            {fetchError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                color="error"
                variant="standard">     
                {fetchError}</Alert>}
        </Box>
    )
}

export default ProfilePage
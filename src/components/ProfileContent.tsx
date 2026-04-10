import { Alert, Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"
import useAuthenticate from "../hooks/useAuthenticate"

const ProfileContent = () => {
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState<string>('')
    const dispatch = useAppDispatch()
    const { token, userId, logOut: authLogOut } = useAuthenticate()

    const { data, isError, isFetching, error } = useFetchUserQuery(
        { id: userId, token: token }
    )

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                setFetchError(error.data.error)
            } else {
                setFetchError('Error fetching user data / timeout')
            }
            setTimeout(() => {
                setFetchError('')
                dispatch(logoutAuth())
                authLogOut()
                navigate('/login')
            }, 5000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, authLogOut])

    const logOut = () => {
        dispatch(logoutAuth())
        authLogOut()
        navigate('/login')
    }

    return (
        <Box sx={{ 
            width: { xs: 200, md: 300 },
            display: 'flex',
            flexDirection: 'column',
            padding: 1,
            alignItems: 'center',
            textAlign: 'center',
            gap: 2 }}>
            <Typography><b>Logged in as <u>{data?.username}</u></b></Typography>
            <Typography>Your shopping cart has <b>{data?.cart?.length}</b> items</Typography>
            <Typography>Happy shopping!</Typography>
            <Button variant='contained' onClick={logOut}>Logout</Button>
            {fetchError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                color="error"
                variant="standard">     
                {fetchError}</Alert>}
        </Box>
    )
}

export default ProfileContent
import { Alert, Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"
import useAuthenticate from "../hooks/useAuthenticate"

const ProfilePage = () => {
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
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            padding: 1,
            alignItems: 'center',
            gap: 1.5 }}>
            <Typography variant="h5">PROFILE PAGE</Typography>
            <Typography>This is the profile page of <u>{data?.username}</u></Typography>
            <Typography>Your shopping cart currently has <b>{data?.cart?.length}</b> items</Typography>
            <Typography>Happy shopping!</Typography>
            <Button variant='contained' onClick={logOut}>Logout</Button>
            {fetchError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                color="error"
                variant="standard">     
                {fetchError}</Alert>}
        </Box>
    )
}

export default ProfilePage
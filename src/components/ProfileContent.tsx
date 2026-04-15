import { Alert, Box, Button, CircularProgress, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDeleteUserMutation, useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"
import useAuthenticate from "../hooks/useAuthenticate"

const ProfileContent = () => {
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState<string>('')
    const [deleteOk, setDeleteOk] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { token, userId, logOut: authLogOut } = useAuthenticate()
    const [deleteUser] = useDeleteUserMutation()

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
            }, 3000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, authLogOut])

    const logOut = () => {
        dispatch(logoutAuth())
        authLogOut()
        navigate('/login')
    }

    const deleteAccount = async () => {
        if (confirm('Are you sure you want to delete your account?')) {
            try {
                await deleteUser({ id: userId, token: token }).unwrap()
                setDeleteOk(true)
                setTimeout(() => {
                    dispatch(logoutAuth())
                    authLogOut()
                    navigate('/signuppage')
                }, 3000)
            } catch (err) {
            if (isApiError(err)) {
                setFetchError(err.data.error)
            } else {
                setFetchError('Failed to delete user')
            }
        }
        }
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
            <Button variant='contained' 
                onClick={logOut}
                disabled={deleteOk}>Logout</Button>
            <Link variant="subtitle1" 
                color="error" 
                underline="none" 
                component="button"
                disabled={deleteOk}
                onClick={deleteAccount}
                sx={{ cursor: 'pointer' }}>
                    Delete account
            </Link>
            {fetchError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                color="error"
                variant="standard">     
                {fetchError}</Alert>}
            {deleteOk && <Box sx={{ justifyItems: 'center', padding: 1 }}>
                <Alert sx={{ alignItems: 'center', justifyContent: 'center', mb: 2 }}
                    color="info"
                    variant="standard">
                    Account deleted successfully. Redirecting...</Alert>
                    <CircularProgress/>
                </Box>}
        </Box>
    )
}

export default ProfileContent
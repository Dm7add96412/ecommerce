import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useDeleteUserMutation, useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"
import useAuthenticate from "../hooks/useAuthenticate"
import AlertSnackBar from "./AlertSnackBar"

const ProfileContent = () => {
    const navigate = useNavigate()
    const [fetchError, setFetchError] = useState<string>('')
    const [deleteOk, setDeleteOk] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
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
        setLoading(true)
        setOpen(false)
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

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
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
            <Link variant="body1"
                color="info"
                underline="none"
                component="button"
                disabled={loading}
                onClick={() => navigate('/orderhistory')}>
                Order history
            </Link>
            <Button variant='contained' 
                onClick={logOut}
                disabled={loading}>Logout</Button>
            <Link variant="subtitle1" 
                color="error" 
                underline="none" 
                component="button"
                disabled={loading}
                onClick={handleClickOpen}
               >
                    Delete account
            </Link>
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog">
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete your account?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once you remove your account the action cannot be undone.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteAccount}>
                        OK
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            {fetchError !== '' && 
            <AlertSnackBar 
                message={fetchError}
                severity="error"/>}
            {deleteOk && fetchError === '' && 
            <AlertSnackBar 
                message="Account deleted successfully. Redirecting..."
                severity="success"/>}
            {loading && <Box sx={{ justifyItems: 'center', padding: 1 }}>
                    <CircularProgress/>
                </Box>}
        </Box>
    )
}

export default ProfileContent
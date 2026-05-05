import { Box, CircularProgress, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useSavePaymentMutation } from "../redux/api/stripeApi"
import { isApiError } from "../utils/apiError"
import { useEffect, useState } from "react"
import AlertSnackBar from "../components/AlertSnackBar"
import useAuthenticate from "../hooks/useAuthenticate"
import { useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { logoutAuth } from "../redux/reducers/authReducer"

const SuccessPage = () => {
    const params = useParams()
    const sessionId = params.sessionId
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const { token, userId, logOut } = useAuthenticate()
    const { data, isError, isFetching, error, refetch } = useFetchUserQuery({ id: userId, token: token })
    const [savePayment] = useSavePaymentMutation()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const dispatch = useAppDispatch()

    const handleSavePayment = async () => {
        try {
            if (sessionId) {
                const response = await savePayment({ sessionId: sessionId, token: token, id: userId })
                if (response.data) {
                    refetch()
                    setLoading(false)
                } else if (response.error) throw response.error
            } else throw { error: 'Could not get session ID' }
        } catch(error) {
            setLoading(false)
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error processing payment')
            }
        }
    }

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error fetching user data / timeout')
            }
            setTimeout(() => {
                dispatch(logoutAuth())
                logOut()
                navigate('/login')
            }, 3000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, logOut])

    useEffect(() => {
        if(token && userId && sessionId) {
            handleSavePayment()
        }
    }, [sessionId, token, userId])

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center',
            width: 400  }}>
            {errorMessage !== '' &&
            <AlertSnackBar message={errorMessage}
                severity="error"/>}
            {loading && <CircularProgress sx={{ alignSelf: 'center' }}/>}
            {errorMessage === '' && !loading ? 
            <Alert severity="success"
                variant="standard"
                icon={<CheckCircleIcon fontSize="large"/>}
                sx={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                 }}>
                <Typography variant='h5'
                    sx={{ display: 'flex',
                    flexDirection: 'row',
                    }}>
                    Payment successful
                </Typography>
            </Alert> :
            !loading &&
            <Alert severity="error"
                variant="standard"
                icon={<CheckCircleIcon fontSize="large"/>}
                sx={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                 }}>
                <Typography variant='h5'
                    sx={{ display: 'flex',
                    flexDirection: 'row',
                    }}>
                    Error processing payment
                </Typography>
            </Alert>}
        </Box>
    )
}

export default SuccessPage
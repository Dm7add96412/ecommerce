import { Box, Typography } from "@mui/material"
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
    const { token, userId, logOut } = useAuthenticate()
    const { data, isError, isFetching, error } = useFetchUserQuery({ id: userId, token: token })
    const [savePayment] = useSavePaymentMutation()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const dispatch = useAppDispatch()

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
        if(data && sessionId) {
            handleSavePayment()
        }
    }, [sessionId, data])

    const handleSavePayment = async () => {
        try {
            if (sessionId) {
                const response = await savePayment({ sessionId: sessionId, token: token, id: userId })
                if (response.data) {
                   console.log('Response data: ', response.data)
                } else if (response.error) throw response.error
            } else throw { error: 'Could not get session ID' }
        } catch(error) {
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error processing payment')
            }
        }
    }

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
            {errorMessage === '' ? 
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
                    Could not complete payment
                </Typography>
            </Alert>}
        </Box>
    )
}

export default SuccessPage
import { Box, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert } from "@mui/material"
import { useParams } from "react-router-dom"
import { useSavePaymentMutation } from "../redux/api/stripeApi"
import { isApiError } from "../utils/apiError"
import { useEffect } from "react"

const SuccessPage = () => {
    const params = useParams()
    const sessionId = params.sessionId
    const [savePayment] = useSavePaymentMutation()
    console.log(sessionId)

    const handleSavePayment = async () => {
        try {
            if (sessionId) {
                const response = await savePayment(sessionId)
                console.log('Response data: ', response.data)
            } else throw { error: 'Could not get session ID' }
            
        } catch(error) {
            if (isApiError(error)) {
           /*      setErrorMessage(error.data.error) */
            } else {
              /*   setErrorMessage('Error processing payment') */
            }
        }
    }

    useEffect(() => {
        handleSavePayment()
    }, [sessionId])

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center',
            width: 300  }}>
            <Alert severity="success"
                variant="standard"
                icon={<CheckCircleIcon fontSize="large"/>}>
            <Typography variant='h5'
                sx={{ display: 'flex',
                flexDirection: 'row',
                 }}>
                Payment successful
            </Typography>
            </Alert>
        </Box>
    )
}

export default SuccessPage
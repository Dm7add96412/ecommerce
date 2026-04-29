import { Box, Typography } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Alert } from "@mui/material"

const CancelPage = () => {

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center',
            width: 300  }}>
            <Alert severity="error"
                variant="standard"
                icon={<CheckCircleIcon fontSize="large"/>}>
            <Typography variant='h5'
                sx={{ display: 'flex',
                flexDirection: 'row',
                 }}>
                Payment cancelled
            </Typography>
            </Alert>
        </Box>
    )
}

export default CancelPage
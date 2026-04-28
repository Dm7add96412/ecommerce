import { Box, Typography } from "@mui/material"

const SuccessPage = () => {

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center',
            width: 250  }}>
            <Typography variant='h5'>Payment successful</Typography>
        </Box>
    )
}

export default SuccessPage
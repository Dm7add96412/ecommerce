import { Box, Typography } from "@mui/material"

const CancelPage = () => {

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center',
            width: 250  }}>
            <Typography variant='h5'>Payment cancelled</Typography>
        </Box>
    )
}

export default CancelPage
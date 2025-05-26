import { Box, Typography } from "@mui/material"

const HomePage = () => {
    return (
        <Box sx={{ display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                padding: 1,
                gap: 1
                }}>
            <Typography variant="h5">HOMEPAGE</Typography>
            <Typography> Welcome to this fancy E-commerce website! 
                Enjoy your fake shopping! :)
            </Typography>
        </Box>
    )
}

export default HomePage
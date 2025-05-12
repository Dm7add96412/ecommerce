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
            <Typography> Welcome to this fancy E-commerce website! There are no bugs on this site and the design is flawless,
                dynamic and smooth! If you notice any problems on this site, remember, there are no bugs on this site, only
                carefully contemplated, planned, designed and implemented features!
                Enjoy your fake shopping! :)
            </Typography>
        </Box>
    )
}

export default HomePage
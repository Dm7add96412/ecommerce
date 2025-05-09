import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <Box sx={{ justifyItems: 'center' }}>
            <Typography>This is the profile page</Typography>
            <Button variant='contained' onClick={logOut}>Logout</Button>
        </Box>
    )
}

export default ProfilePage
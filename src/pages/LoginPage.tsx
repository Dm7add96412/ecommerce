import { Box, Button, Typography } from "@mui/material"
import TextField from '@mui/material/TextField'

const LoginPage = () => {
    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center' }}>
            <Typography variant='h5'>LOGIN</Typography>
            <br/>
            <TextField label='Username' variant='outlined' size='small'/>
            <TextField label='Password' variant='outlined' size='small'/>
            <Button variant='contained'>Login</Button>
        </Box>
    )
}

export default LoginPage
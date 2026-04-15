import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useCreateUserMutation } from "../redux/api/userApi"
import { isApiError } from "../utils/apiError"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
    const navigate = useNavigate()
    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [retypePassword, setRetypePassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [createUser] = useCreateUserMutation()

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setPasswordError(false)
        
        if (password !== retypePassword) {
            setError('Passwords do not match')
            setPasswordError(true)
            return
        }
        try {
            const result = await createUser({ username, password }).unwrap()
            if (result) {
                setSuccess(true)
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            }
        } catch (err) {
            if (isApiError(err)) {
                setError(err.data.error)
            } else {
                setError('Failed to create user')
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
            width: 250 }}>
            <Typography variant='h5'>SIGN UP</Typography>
            <br/>
            <Box sx={{ display: 'flex',
                    flexDirection: 'column',
                    gap: 1 }}
                    component='form'
                    onSubmit={handleSignUp}>
                <TextField 
                    label='Username' 
                    variant='outlined' 
                    size='small'
                    type="text"
                    value={username}
                    onChange={event => setUserName(event.target.value)}/>
                <TextField 
                    label='Password' 
                    variant='outlined' 
                    size='small'
                    type='password'
                    value={password}
                    error={passwordError ? true : false}
                    onChange={event => setPassword(event.target.value)}/>
                <TextField 
                    label='Retype password' 
                    variant='outlined' 
                    size='small'
                    type='password'
                    value={retypePassword}
                    error={passwordError ? true : false}
                    onChange={event => setRetypePassword(event.target.value)}/>
                <Button variant='contained' type='submit' disabled={success}>Create account</Button>
                {(error) && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                    color="error"
                    variant="standard">     
                    {error}</Alert>}
                {success && <Box sx={{ justifyItems: 'center', padding: 1 }}>
                    <Alert sx={{ alignItems: 'center', justifyContent: 'center', mb: 2, textAlign: 'center' }}
                        color="success"
                        variant="standard">
                        Account creation successful! Redirecting...</Alert>
                        <CircularProgress/>    
                    </Box>}
            </Box>
        </Box>
    )
}

export default SignUpPage
import { Alert, Box, Button, Typography } from "@mui/material"
import TextField from '@mui/material/TextField'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useLoginMutation } from "../redux/api/authApi"
import { useFetchUserQuery } from "../redux/api/userApi"
import useAppDispatch from "../hooks/useAppDispatch"
import { loginAuth } from "../redux/reducers/authReducer"
import { isApiError } from "../utils/apiError"

const LoginPage = () => {
    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState<string | null>(null)
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { data: userDetails, isSuccess } = useFetchUserQuery(
        { id: userId, token: token },
        { skip: !userId || !token })

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoginError(null)
        try {
            const resultUser = await login({ username, password }).unwrap()
            dispatch(loginAuth({ token: resultUser.token, userId: resultUser.id }))
            setToken(resultUser.token)
            setUserId(resultUser.id)
        } catch (err: unknown) {
            if (isApiError(err)) {
                setLoginError(err.data.error)
            } else {
                setLoginError('Login failed')
            }
        }
        setUserName('')
        setPassword('')
    }

    useEffect(() => {
        if (token && userDetails && isSuccess) {
            navigate('/profilepage')
        }
    }, [isSuccess, userDetails, token, navigate])

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 2,
            gap: 1,
            textAlign: 'center' }}>
            <Typography variant='h5'>LOGIN</Typography>
            <br/>
            <Box sx={{ display: 'flex',
                    flexDirection: 'column',
                    gap: 1 }}
                    component='form'
                    onSubmit={handleLogin}>
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
                    onChange={event => setPassword(event.target.value)}/>
                <Button variant='contained' type='submit'>Login</Button>
                {loginError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                    color="error"
                    variant="standard">     
                    {loginError}</Alert>}
            </Box>
        </Box>
    )
}

export default LoginPage
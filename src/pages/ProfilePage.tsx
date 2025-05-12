import { Alert, Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useFetchUserQuery } from "../redux/api/userApi"


const ProfilePage = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [fetchError, setFetchError] = useState<string>('')

    const { data, isError } = useFetchUserQuery(
        { id: userId, token: token },
        { skip: !userId || !token }
    )
    
    useEffect(() => {
        const localUser = (localStorage.getItem('user'))
        if (localUser) {
            const user = JSON.parse(localUser)
            setToken(user.token)
            setUserId(user.id)
        } 
    }, [])

    useEffect(() => {
        if(isError) {
            setFetchError('Error fetching user data')
            setTimeout(() => {
                setUserId('')
                setToken('')
                setFetchError('')
                localStorage.removeItem('user')
                navigate('/login')
            }, 5000)
            
        }
    }, [isError, navigate])

    const logOut = () => {
        localStorage.removeItem('user')
        setToken('')
        setUserId('')
        navigate('/login')
    }

    return (
        <Box sx={{ display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            padding: 1,
            alignItems: 'center',
            gap: 1.5 }}>
            <Typography variant="h5">PROFILE PAGE</Typography>
            <Typography>This is the profile page of <u>{data?.username}</u></Typography>
            <Button variant='contained' onClick={logOut}>Logout</Button>
            {fetchError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                color="error"
                variant="standard">     
                {fetchError}</Alert>}
        </Box>
    )
}

export default ProfilePage
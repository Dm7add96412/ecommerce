import { useEffect, useState } from 'react';
import { Alert, Box, Card, Grid2, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import useAppSelector from '../hooks/useAppSelector';
import { useFetchUserQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { CartItem } from '../types/CartItem';

const CartPage = () => {
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)
    const { data, isError } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        } 
    }, [authUserId, authToken])

    const onAddToCart = async (cartItem: CartItem) => {
        cartItem.quantity++
        await updateUser({ id: userId, token, cartItem })
    }

    const onRemoveFromCart = async (cartItem: CartItem) => {
        cartItem.quantity--
        await updateUser({ id: userId, token, cartItem })
    }

    const cartTotal = () => {
        if (data?.cart && data.cart.length > 0) {
            return data.cart.map(item => item.price * item.quantity).reduce((a, b) => a + b)
        }
    }

    return (
        <Box sx={{ justifyItems: 'center', minWidth: '100%' }}>
            <Card sx={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '90%'}}>
                <Typography variant='h5' sx={{ padding: 2 }}> SHOPPING CART</Typography>
                <br/>
                {isError && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                    color="error"
                    variant="standard">     
                    Error fetching user data</Alert>}
                <Grid2 container spacing={2}
                    columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                    sx={{ width: '100%',
                        gap: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        textAlign: 'center'
                    }}>
                    <Box sx={{ display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1.5 }}>
                        <Grid2 size={2}>
                            <Typography >
                                <b>Image</b>
                            </Typography>
                        </Grid2>
                        <Grid2 size={6}>
                        <Typography >
                                <b>Title</b>
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
                        <Typography >
                                <b>Price</b>
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
                        <Typography >
                                <b>Quantity</b>
                            </Typography>
                        </Grid2>
                    </Box>
                    {(data?.cart && data.cart.length > 0) && data.cart.map(item => (
                        <Box key={item.id} sx={{ display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1.5 }}>
                            <Grid2 size={2}>
                                <img src={item.images[0]} style={{ width: '50%', height: 100 }}/>
                            </Grid2>
                            <Grid2 size={6}>
                                <Typography>
                                    {item.title}
                                </Typography>
                            </Grid2>
                            <Grid2 size={2}>
                                <Typography>
                                    {item.price} €
                                </Typography>
                            </Grid2>
                            <Grid2 size={2} 
                                sx={{ display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center' }}>
                                <IconButton onClick={() => onAddToCart(item)}>
                                    <AddIcon/>
                                </IconButton>
                                <Typography>
                                    {item.quantity}
                                </Typography>
                                <IconButton onClick={() => onRemoveFromCart(item)}>
                                    <RemoveIcon/>
                                </IconButton>
                            </Grid2>
                        </Box>
                    ))}
                </Grid2>
                <br/>
            </Card>
            <br/>
            <Typography variant='h6'>Total price: {cartTotal()} €</Typography>
        </Box>
    )
}

export default CartPage
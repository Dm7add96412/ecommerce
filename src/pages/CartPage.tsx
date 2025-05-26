import { useEffect, useState } from 'react';
import { Alert, Box, Card, Grid2, IconButton, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';
import { useFetchUserQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { CartItem } from '../types/CartItem';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutAuth } from '../redux/reducers/authReducer';
import { isApiError } from '../utils/apiError';

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [itemQuantity, setItemQuantity] = useState<string | number>('')
    const [itemId, setItemId] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { token: authToken, userId: authUserId } = useAppSelector(state => state.authReducer)
    const { data, isError, isFetching, error } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()

    useEffect(() => {
        if (authToken && authUserId) {
            setToken(authToken)
            setUserId(authUserId)
        } 
    }, [authUserId, authToken])

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error fetching user data / timeout')
            }
            setTimeout(() => {
                setUserId('')
                setToken('')
                dispatch(logoutAuth())
                navigate('/login')
            }, 5000)
        }
    }, [isError, data, token, isFetching, navigate, dispatch, error])

    const onAddToCart = async (cartItem: CartItem) => {
        const updatedItem: CartItem = { ...cartItem, quantity: cartItem.quantity + 1 }
        await updateUser({ id: userId, token, cartItem: updatedItem })
    }

    const onRemoveFromCart = async (cartItem: CartItem) => {
        const updatedItem: CartItem = { ...cartItem, quantity: cartItem.quantity - 1 }
        await updateUser({ id: userId, token, cartItem: updatedItem })
    }

    const handleItemQuantity = (quantity: string, id: string) => {
        setItemId(id);
        setItemQuantity(quantity);
    }

    const onInsertManualCart = async (cartItem: CartItem) => {
        const numbered = Number(itemQuantity)
        if (itemId !== cartItem.id) {
            setItemQuantity('')
            setItemId('')
            return
        }
        if (itemQuantity === '') {
            setItemId('')
            return
        }
        if (numbered) {
            const updatedItem: CartItem = { ...cartItem, quantity: numbered }
            await updateUser({ id: userId, token, cartItem: updatedItem })
            setItemQuantity('')
            setItemId('')
        }
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
                {errorMessage && <Alert sx={{ alignItems: 'center', justifyContent: 'center' }}
                    color="error"
                    variant="standard">     
                    {errorMessage}</Alert>}
                {!isError && <Grid2 container spacing={2}
                    columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                    sx={{ width: '100%',
                        gap: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        textAlign: 'center'
                    }}>
                    <Box key='head-row' 
                        sx={{ display: 'flex',
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
                        <Box key={item.id}
                            sx={{ display: 'flex',
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
                                <IconButton onClick={() => onRemoveFromCart(item)}>
                                    <RemoveIcon/>
                                </IconButton>
                                <TextField
                                    variant='standard'
                                    size='small'
                                    inputMode='text'
                                    value={itemId === item.id ? itemQuantity : item.quantity}
                                    onChange={event => handleItemQuantity(event.target.value, item.id)}
                                    onBlur={() => onInsertManualCart(item)}
                                    sx={{
                                        width: `${String(item.quantity).length + 1}ch`,
                                        minWidth: `${String(item.quantity).length + 1}ch`,
                                        height: 'auto',
                                        textAlign: 'center',
                                        '& input': {
                                            textAlign: 'center',
                                            padding: 0,
                                        },
                                    }}/>
                                <IconButton onClick={() => onAddToCart(item)}>
                                    <AddIcon/>
                                </IconButton>
                            </Grid2>
                        </Box>
                    ))}
                </Grid2>}
                <br/>
            </Card>
            <br/>
            {!isError && <Typography variant='h6'>Total price: {cartTotal()} €</Typography>}
        </Box>
    )
}

export default CartPage
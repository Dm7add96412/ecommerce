import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Card, CardActionArea, Grid2, TextField, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom"

import { useFetchUserQuery, useUpdateUserMutation } from '../redux/api/userApi';
import { CartItem } from '../types/CartItem';
import useAppDispatch from '../hooks/useAppDispatch';
import { logoutAuth } from '../redux/reducers/authReducer';
import { isApiError } from '../utils/apiError';
import useAuthenticate from '../hooks/useAuthenticate';
import AlertSnackBar from '../components/AlertSnackBar';

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [itemQuantity, setItemQuantity] = useState<string | number>('')
    const [itemId, setItemId] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { token, userId, logOut } = useAuthenticate()
    const { data, isError, isFetching, error } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()

    useEffect(() => {
        if(!isFetching && (isError || !data)) {
            if (isApiError(error)) {
                setErrorMessage(error.data.error)
            } else {
                setErrorMessage('Error fetching user data / timeout')
            }
            setTimeout(() => {
                dispatch(logoutAuth())
                logOut()
                navigate('/login')
            }, 3000)
        }
    }, [isError, data, isFetching, navigate, dispatch, error, logOut])

    const onAddToCart = async (cartItem: CartItem) => {
        const updatedItem: CartItem = { ...cartItem, quantity: cartItem.quantity + 1 }
        await updateUser({ id: userId, token, cartItem: updatedItem })
    }

    const onRemoveFromCart = async (cartItem: CartItem) => {
        const updatedItem: CartItem = { ...cartItem, quantity: cartItem.quantity - 1 }
        await updateUser({ id: userId, token, cartItem: updatedItem })
    }

    const onDeleteFromCart = async (cartItem: CartItem) => {
        const updatedItem: CartItem = { ...cartItem, quantity: 0 }
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
        if (itemQuantity === '0' || numbered === 0) {
            const updatedItem: CartItem = { ...cartItem, quantity: 0 }
            await updateUser({ id: userId, token, cartItem: updatedItem })
            setItemQuantity('')
            setItemId('')
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
        <Box sx={{ justifyItems: 'center', maxWidth: 800, mb: 10 }}>
            <Typography variant='h5' sx={{ padding: 2 }}> SHOPPING CART</Typography>
            {errorMessage && <AlertSnackBar 
                    message={errorMessage}
                    severity="error"/>}
            {!isError && <Grid2 container spacing={1}
                columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                sx={{ width: '100%',
                    gap: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    textAlign: 'center'
                }}>
                {(data?.cart && data.cart.length > 0) && data.cart.map(item => (
                        <Grid2 size={12}
                            key={item.id}
                            sx={{ display: 'flex',
                                justifyContent: 'center'
                                }}>
                            <Card 
                                component={RouterLink}
                                to={`/singleproduct/${item.id}`}
                                style={{ textDecoration: 'none' }}
                                sx={{ 
                                    width: { xs: 380, md: 700 },
                                }}>
                                <CardActionArea sx={{ display: 'flex',
                                    flexDirection: 'row', }}>
                                    <Grid2 size={3} sx={{ display: 'flex' }}>
                                        <img src={item.images[0]} 
                                            style={{ width: 100, height: 100, borderRadius: '50px', marginTop: 3, marginBottom: 3 }}/>
                                    </Grid2>
                                    <Grid2 size={4}>
                                        <Typography
                                            sx={{whiteSpace: 'collapse', 
                                                overflow: 'hidden',
                                                margin: 2}}>
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
                                            <RemoveIcon fontSize='small'
                                                onClick={(e) => {e.preventDefault(); onRemoveFromCart(item)}}
                                                sx={{ "&:hover": { cursor: "pointer", color: 'primary.main' } }}/>
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
                                                textAlign: 'center',
                                                mb: 0.2,
                                                '& input': {
                                                    textAlign: 'center',
                                                    padding: 0,
                                                },
                                            }}/>
                                            <AddIcon fontSize='small' 
                                                onClick={(e) => {e.preventDefault(); onAddToCart(item)}}
                                                sx={{ "&:hover": { cursor: "pointer", color: 'primary.main' } }}/>
                                    </Grid2>
                                    <Grid2 size={1}
                                            sx={{ display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center' }}>
                                        <DeleteIcon fontSize='small'
                                            color='action'
                                            sx={{ "&:hover": { cursor: "pointer", color: 'primary.main' } }}
                                            onClick={(e) => {e.preventDefault(); onDeleteFromCart(item)}}/>
                                    </Grid2>
                                </CardActionArea>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>}
                <br/>
            <br/>
            <AppBar color='inherit' position='fixed' sx={{ top: 'auto', bottom: 1, padding: 2 }}>
                <Box sx={{ display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {!isError && <Typography variant='h6'>Total price: {cartTotal()} €</Typography>}
                    <Button variant='contained'>Checkout</Button>
                </Box>
            </AppBar>
        </Box>
    )
}

export default CartPage
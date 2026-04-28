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
import notfound from '../assets/linked4.png'
import { useCreatePaymentIntentMutation } from '../redux/api/stripeApi';

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [itemQuantity, setItemQuantity] = useState<string | number>('')
    const [itemId, setItemId] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { token, userId, logOut } = useAuthenticate()
    const { data, isError, isFetching, error } = useFetchUserQuery({ id: userId, token: token })
    const [updateUser] = useUpdateUserMutation()
    const [createPaylmentIntent] = useCreatePaymentIntentMutation()

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

    const makePayment = async() => {
        if (data?.cart) {
            try {
                const response = await createPaylmentIntent(data.cart)
                if (response.data) {
                   window.location.href = response.data.url
                } 
            } catch(err) {
                console.log(err)
            }
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
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 120
                                }}>
                            <Card 
                                component={RouterLink}
                                to={`/singleproduct/${item.id}`}
                                style={{ textDecoration: 'none' }}
                                sx={{ 
                                    width: { xs: 400, md: 750 },
                                    height: '100%',
                                    alignContent: 'center'
                                }}>
                                <CardActionArea sx={{ display: 'flex',
                                    flexDirection: 'row',
                                    height: '100%' }}>
                                    <Grid2 size={2} sx={{ display: 'flex' }}>
                                        <img src={item.images[0]}
                                            style={{ width: 70, height: 70, borderRadius: '50px', marginTop: 3, marginBottom: 5 }}
                                            onError={(e) => {
                                                e.currentTarget.src = notfound
                                            }}/>
                                    </Grid2>
                                    <Grid2 size={5}>
                                        <Typography
                                            sx={{ whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                margin: 2,
                                                textAlign: 'start' }}>
                                            {item.title}
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={2}>
                                        <Typography>
                                            {item.price * item.quantity} €
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={2} >
                                        <Grid2 container
                                            columns={3}
                                            sx={{ display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            mb: 0.5 }}>
                                            <Grid2 size={3}>
                                                <Typography visibility='hidden'>hidden</Typography>
                                            </Grid2>                                 
                                            <Grid2
                                                size={3}
                                                sx={{ display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                }}>
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
                                                        onClick={(e) => e.preventDefault()}
                                                        sx={{
                                                            width: `${String(item.quantity).length + 1}ch`,
                                                            minWidth: `${String(item.quantity).length + 1}ch`,
                                                            textAlign: 'center',
                                                            mb: 0.2,
                                                            '& input': {
                                                                textAlign: 'center',
                                                                padding: 0,
                                                            }
                                                        }}/>
                                                <AddIcon fontSize='small' 
                                                    onClick={(e) => {e.preventDefault(); onAddToCart(item)}}
                                                    sx={{ "&:hover": { cursor: "pointer", color: 'primary.main' } }}/>
                                            </Grid2>
                                            <Grid2 size={3}>
                                                <Typography fontSize='small' 
                                                    visibility={item.quantity < 2 ? 'hidden' : 'visible'}
                                                    sx={{ whiteSpace: 'nowrap', 
                                                        overflow: 'visible',
                                                        width: '100%' }}>
                                                    x {item.price} €
                                                </Typography>
                                            </Grid2>
                                        </Grid2>
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
                    <Button variant='contained'
                        onClick={makePayment}>
                        Checkout
                    </Button>
                </Box>
            </AppBar>
        </Box>
    )
}

export default CartPage
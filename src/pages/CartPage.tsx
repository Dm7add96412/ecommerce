import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { Box, Card, Grid2, Typography } from '@mui/material';

const CartPage = () => {
    const cart = useAppSelector(state => state.cartReducer)
    const dispatch = useAppDispatch()

    return (
        <Card sx={{ display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '90%',
            padding: 1 }}>
            <Typography variant='h5' sx={{ padding: 2 }}> SHOPPING CART</Typography>
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
                {cart && cart.map(item => (
                    <Box key={item.id} sx={{ display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1.5 }}>
                        <Grid2 size={2}>
                            <img src={item.images[0]} style={{ width: '50%', height: 50 }}/>
                        </Grid2>
                        <Grid2 size={6}>
                            <Typography>
                                {item.title}
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography>
                                {item.price}
                            </Typography>
                        </Grid2>
                        <Grid2 size={2}>
                            <Typography>
                                {item.quantity}
                            </Typography>
                        </Grid2>
                    </Box>
                ))}
            </Grid2>
        </Card>
    )
}

export default CartPage
import { Box, Card, Grid2, Typography, Link } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Link as RouterLink } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import { addToCart } from "../redux/reducers/cartReducer"
import Product from "../types/Product"
import RenderProductsProp from "../types/RenderProductsProp"

const RenderProducts:React.FC<RenderProductsProp> = ({productsList}) => {
    const dispatch = useAppDispatch()

    const onAddToCart = (payload: Product) => {
        dispatch(addToCart(payload))
    }

    return (
        <Grid2 container spacing={3}
            columnSpacing={1}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
            sx={{ width: '100%',
                margin: '0 auto',
                gap: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'}}>
            {productsList.map(product => (
                <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                    key={product.id} 
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 0.5 }}>
                    <Link component={RouterLink}
                        to={`/singleproduct/${product.id}`}
                        style={{ textDecoration: 'none', display: 'container', width: '100%', height: '100%' }}
                        sx={{ transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)'
                            }
                         }}>
                        <Card sx={{ width: '100%',
                            height: '100%',
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            alignSelf: 'center',
                            padding: 0.5,
                            gap: 1}}>
                            <img src={product.images[0]} alt='' style={{ width: '100%', height: 300, objectFit: 'cover' }} />
                            <Typography 
                                sx={{whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    width: '100%',
                                    textAlign: 'center'}}>
                                {product.title}
                            </Typography>
                            <Box sx={{ display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '75%' }}>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography >
                                        Price:
                                    </Typography>
                                    <Typography >
                                        <b>{product.price} €</b>
                                    </Typography>
                                </Box>
                                <AddShoppingCartIcon
                                    onClick={(e) => {e.preventDefault(); onAddToCart(product)}}
                                    sx={{ transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                            color: 'primary.main' }
                                    }}/>
                            </Box>
                        </Card>
                    </Link>
                </Grid2>
            ))}
        </Grid2>
    )
}

export default RenderProducts
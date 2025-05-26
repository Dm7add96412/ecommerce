import { useParams } from "react-router-dom"
import { Alert, Box, Button, Card, CircularProgress, Grid2, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { useFetchProductQuery } from "../redux/api/productApis"
import useAppSelector from "../hooks/useAppSelector"
import useAddToCart from "../hooks/useAddToCart"

const ProductPage = () => {
    const params = useParams()
    const productId = params.productId
    const { data, isError, isLoading } = useFetchProductQuery(productId ?? '')
    const { token } = useAppSelector(state => state.authReducer)
    const addToCart = useAddToCart()

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
            {isLoading && <CircularProgress/>}
            {(isError || productId === '') && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                Failed fetching product data</Alert>}
            {(!isLoading && !isError && data) && <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid2 container spacing={3}
                    columnSpacing={1}
                    columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                    sx={{ width: '100%',
                        margin: '0 auto',
                        gap: 1,
                        display: 'flex',
                        justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                        {data.images.slice(0,4).map((image, index) => (
                            <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                                key={`${data.id}+${index}`} 
                                sx={{ justifyContent: 'center',
                                    width: '100%',
                                    padding: 1 }}>
                                <img src={image} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Grid2>
                        ))}
                    </Box>
                    <br/>
                    <Box sx={{
                        textAlign: 'center',
                        width: '80%',
                        padding: 0.5 }}>
                        <Typography variant="h5">
                            {data.title} 
                        </Typography>
                        <br/>
                        <Typography>
                            {data.description} 
                        </Typography>
                        <br/>
                        <Box sx={{ alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                padding: 1,
                                gap: 3 }}>
                            <Typography fontSize={19}>
                                Price: <b>{data.price} €</b>
                            </Typography>
                            <Typography>
                                {token && <Button variant='contained' size='medium' onClick={() => addToCart(data)}>
                                    <AddShoppingCartIcon/>  Add to cart
                                </Button>}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
            </Card>}
        </Box>

    )
}

export default ProductPage
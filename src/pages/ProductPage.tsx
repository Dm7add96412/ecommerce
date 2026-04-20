import { useParams } from "react-router-dom"
import { Alert, AppBar, Badge, Box, Button, CircularProgress, Grid2, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

import { useFetchProductQuery } from "../redux/api/productApis"
import useAddToCart from "../hooks/useAddToCart"
import { useFetchUserQuery } from "../redux/api/userApi"
import useAuthenticate from "../hooks/useAuthenticate"
import AlertSnackBar from "../components/AlertSnackBar"

const ProductPage = () => {
    const params = useParams()
    const productId = params.productId
    const { data, isError, isLoading } = useFetchProductQuery(productId ?? '')
    const { addToCart, fetchError, addedOk } = useAddToCart()
    const { token, userId } = useAuthenticate()

    const { data: userData } = useFetchUserQuery(
        { id: userId, token: token }
    )

    const ifInCartQuantity = (productId: string) => {
        if (userData && userData.cart) {
            const foundItem = userData.cart.find(item => item.id === productId.toString())
            if (foundItem) {
                return foundItem.quantity
            }
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 10  }}>
            {isLoading && <CircularProgress/>}
            {(isError || productId === '') && 
                <Alert sx={{ alignItems: 'center' }}
                    color="warning"
                    variant="standard">
                    Failed fetching product data
                </Alert>}
            {fetchError !== '' && 
            <AlertSnackBar 
                message={fetchError}
                severity="error"/>}
            {addedOk && 
            <AlertSnackBar 
                message="Item added to cart successfully"
                severity="success"
                hideduration={2000}
                location="top"/>}
            {(!isLoading && !isError && data) && 
                <Grid2 container
                    columnSpacing={1}
                    columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                    sx={{ width: '100%',
                        margin: '0 auto',
                        gap: 1,
                        justifyContent: 'center'}}>
                        {data.images.slice(0,3).map((image, index) => (
                            <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                                key={`${data.id}+${index}`} 
                                sx={{ justifyContent: 'center',
                                    width: 370, minWidth: 370,
                                    padding: 1 }}>
                                <img src={image} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </Grid2>
                        ))}
                    <br/>
                    <Box sx={{
                        textAlign: 'center',
                        width: '90%',
                        padding: 0.5 }}>
                        <Typography variant="h5">
                            {data.title} 
                        </Typography>
                        <br/>
                        <Typography>
                            {data.description} 
                        </Typography>
                        <br/>
                        <AppBar color='inherit' position='fixed' sx={{ top: 'auto', bottom: 1, padding: 2 }}>
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
                                {token && <Badge badgeContent={ifInCartQuantity(data.id)} color='error'>
                                    <Button variant='contained' size='medium' onClick={() => addToCart(data)}>
                                    <AddShoppingCartIcon/>  
                                    <Typography
                                        fontSize={15}
                                        sx={{ whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis' }}>
                                        Add to cart
                                    </Typography>
                                </Button>
                                </Badge>}
                            </Typography>
                        </Box>
                        </AppBar>
                    </Box>
                </Grid2>
           }
        </Box>

    )
}

export default ProductPage
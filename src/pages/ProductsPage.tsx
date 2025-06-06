
import { Alert, Box, CircularProgress } from '@mui/material';

import { useFetchAllProductsQuery } from '../redux/api/productApis';
import RenderProducts from '../components/RenderProducts';

const ProductsPage = () => {
    const { data, isLoading, isError } = useFetchAllProductsQuery()

    return (
        <Box sx={{ justifyItems: 'center' }}>
            {isLoading && <CircularProgress/>}
            {isError && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                Failed to fetch all products data</Alert>}
            {(!isLoading && (data === undefined || data.length < 1)) && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                Could not receive products data</Alert>}
            {data && <RenderProducts productsList={data}/>}
        </Box>
    )
}

export default ProductsPage

import { Alert, Box, CircularProgress } from '@mui/material';

import { useFetchAllProductsQuery } from '../redux/api/productApis';
import RenderProducts from '../components/RenderProducts';

const ProductsPage = () => {
    const { data, isError, isLoading } = useFetchAllProductsQuery()


    return (
        <Box sx={{ justifyItems: 'center' }}>
            {isLoading && <CircularProgress/>}
            {isError && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                There's been an error</Alert>}
            {(!isLoading && (data === undefined || data.length < 1)) && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                Could not receive products data</Alert>}
            {data && <RenderProducts productsList={data}/>}
        </Box>
    )
}

export default ProductsPage

import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';

import Product from '../types/Product';
import { useFetchAllProductsQuery } from '../redux/api/productApis';
import RenderProducts from '../components/RenderProducts';

const ProductsPage = () => {
    const { data, error, isError, isLoading } = useFetchAllProductsQuery()
    const [products, setProducts] = useState<Product[]>([])
    const [sort, setSort] = useState<string>('ASC')
   // const users = useAppSelector(state => state.usersReducer)
   // const filteredProducts = useAppSelector((state) => getFiltered(state, search))
    
/*     useEffect(() => {
      const dataProducts = [ ...data ?? [] ]
      setProducts(dataProducts)
    }, [data]) */

    const onSort = () => {
        if (sort === 'ASC') {
            products.sort((a, b) => a.price - b.price)
            setSort('DESC')
        } else {
            products.sort((a, b) => b.price - a.price)
            setSort('ASC')
        }
    }
    
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
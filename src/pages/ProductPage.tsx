import { useParams } from "react-router-dom"
import { Alert, Box, CircularProgress } from "@mui/material"

import { useFetchProductQuery } from "../redux/api/productApis"

const ProductPage = () => {
    const params = useParams()
    const productId = params.productId
    const { data, isError, isLoading, error } = useFetchProductQuery(productId ?? '')



    return (
        <Box sx={{ justifyContent: 'center' }}>
            {isLoading && <CircularProgress/>}
            {isError && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                There's been an error</Alert>}
            {data?.title} 

        </Box>
    )
}

export default ProductPage
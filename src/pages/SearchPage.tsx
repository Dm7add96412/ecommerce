import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CircularProgress, Alert, Box } from "@mui/material"

import { useSearchProductsQuery } from "../redux/api/productApis"
import Product from "../types/Product"
import RenderProducts from "../components/RenderProducts"

const SearchPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const params = useParams()
    const searchWord = params.searchWord
    const { data, isLoading, isError } = useSearchProductsQuery(searchWord ?? '')

    useEffect(() => {
        const foundProducts = [...data ?? []]
        setProducts(foundProducts)
    }, [data, searchWord])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {isLoading && <CircularProgress sx={{ justifySelf: 'center' }}/>}
                {(isError && !isLoading) && <Alert sx={{ alignItems: 'center' }}
                    color="error"
                    variant="standard">     
                    There's been an error</Alert>}
                {!isLoading && (products.length < 1) && <Alert sx={{ alignItems: 'center' }}
                    color="warning"
                    variant="standard">
                    No products found for search word: <u><b>{searchWord}</b></u>
                    </Alert>}
                {(!isLoading && (!isError && products.length > 0)) && <Alert sx={{ alignItems: 'center' }}
                    color="success"
                    variant="standard">
                    Results for the search word: <u><b>{searchWord}</b></u>
                    </Alert>}
            </Box>
            <Box sx={{ justifyItems: 'center', width: '100%' }}>
                {(!isLoading && (!isError && products.length > 0)) && <RenderProducts productsList={products}/>}
            </Box>
        </Box>
    )
}

export default SearchPage
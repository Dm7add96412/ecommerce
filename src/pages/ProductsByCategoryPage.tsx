import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Alert, Box, CircularProgress } from "@mui/material"

import { useFetchAllCategoriesQuery, useFetchProductsByCategoryQuery } from "../redux/api/categoriesApis"
import Product from "../types/Product"
import RenderProducts from "../components/RenderProducts"

const ProductsByCategoryPage = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [categoryName, setCategoryName] = useState<string>('')
    const params = useParams()
    const categoryId = params.categoryId
    const { data: productsData, isLoading, isError } = useFetchProductsByCategoryQuery(categoryId ?? '')
    const { data: categorieData } = useFetchAllCategoriesQuery()
    
    useEffect(() => {
        const foundProducts = [...productsData ?? []]
        setProducts(foundProducts)
    }, [productsData])

    useEffect(() => {
        if (categoryId && categorieData) {
            const category = categorieData.find(category => String(category.id) === categoryId)
            if (category) {
                setCategoryName(category.name)
            }    
        }
    }, [categorieData, categoryId])

    return (
        <Box sx={{ justifyItems: 'center', width: '100%' }}>
            <Box sx={{ justifyItems: 'center', width: '100%'  }}>
            {isLoading && <CircularProgress/>}
            {isError && <Alert sx={{ alignItems: 'center' }}
                color="error"
                variant="standard">     
                There's been an error</Alert>}
            {!isLoading && (products.length < 1) && <Alert sx={{ alignItems: 'center' }}
                color="warning"
                variant="standard">
                No products found in category: {categoryName}
                </Alert>}
            {(!isLoading && (!isError && products.length > 0)) && <Alert sx={{ alignItems: 'center' }}
                color="success"
                variant="standard">
                Products in category: <u><b>{products[0].category.name}</b></u>
                </Alert>}
                <br/>
            </Box>
            <Box sx={{ justifyItems: 'center', width: '100%' }}>
                {(!isLoading && (!isError && products.length > 0)) && <RenderProducts productsList={products}/>}
            </Box>
        </Box>
    )
}

export default ProductsByCategoryPage
import { Box, Card, Grid2, Typography, Link, Button, Alert, InputLabel, Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react"

import useAppDispatch from "../hooks/useAppDispatch"
import { addToCart } from "../redux/reducers/cartReducer"
import Product from "../types/Product"
import RenderProductsProp from "../types/RenderProductsProp"
import HandlePagination from "./HandlePagination"

const RenderProducts:React.FC<RenderProductsProp> = ({ productsList }) => {
    const dispatch = useAppDispatch()
    const [page, setPage] = useState<number>(1)
    const [products, setProducts] = useState<Product[]>([])
    const [sortPrice, setSortPrice] = useState<string>('')
    const [sortAlpha, setSortAlpha] = useState<string>('')
    const [sorting, setSorting] = useState<boolean>(false)
    const [sorted, setSorted] = useState<string>('')

    const limit = 16
    const offset = (page - 1) * limit

    useEffect(() => {
        setProducts([...productsList])
    }, [productsList])

    const productsPaginated = products.slice(offset, offset + limit)

    const onAddToCart = (payload: Product) => {
        dispatch(addToCart(payload))
    }

    const sortByPrice = (event: SelectChangeEvent) => {
        setSorting(true)
        setSortAlpha('')
        setSortPrice(event.target.value as string)
        if(event.target.value as string === 'Low to high') {
            const sorted = [...products].sort((a, b) => a.price - b.price)
            setProducts(sorted)
            setSorted('Low to high')
        } else {
            const sorted = [...products].sort((a, b) => b.price - a.price)
            setProducts(sorted)
            setSorted('High to low')
        }
    }

    const sortAlphabetically = (event: SelectChangeEvent) => {
        setSorting(true)
        setSortPrice('')
        setSortAlpha(event.target.value as string)
        if(event.target.value as string === 'ASC') {
            const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title))
            setProducts(sorted)
            setSorted('ASC')
        } else {
            const sorted = [...products].sort((a, b) => b.title.localeCompare(a.title))
            setProducts(sorted)
            setSorted('DESC')
        }
    }

    const clearSorting = () => {
        setSorting(false)
        setSorted('')
        setSortAlpha('')
        setSortPrice('')
        setProducts([...productsList])
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
                <Grid2 size={12}
                    sx={{ display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 2}}>
                    <Button onClick={clearSorting}>Clear sorting</Button>
                        <FormControl sx={{ width: 130 }}>
                            <InputLabel>Sort by title</InputLabel>
                            <Select value={sortAlpha}
                                label='Sort by title'
                                onChange={sortAlphabetically}>
                                <MenuItem value='ASC'>ASC</MenuItem>
                                <MenuItem value='DESC'>DESC</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 130 }}>
                            <InputLabel>Sort by price</InputLabel>
                            <Select value={sortPrice}
                                label='Sort by price'
                                onChange={sortByPrice}>
                                <MenuItem value='Low to high'>Low to high</MenuItem>
                                <MenuItem value='High to low'>High to low</MenuItem>
                            </Select>
                        </FormControl>
                </Grid2>
                {sorting && <Grid2 size={12}
                        sx={{ display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'}}>
                        <Alert sx={{ alignItems: 'center' }}
                            color='info'>
                                Products sorted {sorted}
                        </Alert>
                    </Grid2>}
                <HandlePagination
                    allProducts={productsList}
                    limit={limit}
                    setPage={setPage}
                    page={page}/>
            {productsPaginated.map(product => (
                <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                    key={product.id} 
                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 0.5 }}>
                    <Link component={RouterLink}
                        to={`/singleproduct/${product.id}`}
                        style={{ textDecoration: 'none', display: 'container', width: '100%', height: '100%' }}
                        sx={{ transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.04)'
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
            <HandlePagination
                allProducts={productsList}
                limit={limit}
                setPage={setPage}
                page={page}/>
        </Grid2>
    )
}

export default RenderProducts
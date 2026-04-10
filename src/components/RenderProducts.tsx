import { Box, Card, Grid2, Typography, Link, Button, Alert, InputLabel, Select, MenuItem, FormControl, SelectChangeEvent, Badge } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Link as RouterLink } from "react-router-dom"
import { useEffect, useState } from "react"

import Product from "../types/Product"
import RenderProductsProp from "../types/RenderProductsProp"
import HandlePagination from "./HandlePagination"
import useAddToCart from "../hooks/useAddToCart"
import { useFetchUserQuery } from "../redux/api/userApi"
import useAuthenticate from "../hooks/useAuthenticate"

const RenderProducts:React.FC<RenderProductsProp> = ({ productsList }) => {
    const [page, setPage] = useState<number>(1)
    const [products, setProducts] = useState<Product[]>([])
    const [sortPrice, setSortPrice] = useState<string>('')
    const [sortAlpha, setSortAlpha] = useState<string>('')
    const [sorting, setSorting] = useState<boolean>(false)
    const [sorted, setSorted] = useState<string>('')
    const addToCart = useAddToCart()
    const { token, userId } = useAuthenticate()

    const { data } = useFetchUserQuery(
        { id: userId, token: token }
    )

    const limit = 16
    const offset = (page - 1) * limit

    useEffect(() => {
        setProducts([...productsList])
    }, [productsList])

    const ifInCartQuantity = (productId: string) => {
        if (data && data.cart) {
            const foundItem = data.cart.find(item => item.id === productId.toString())
            if (foundItem) {
                return foundItem.quantity
            }
        }
    }

    const productsPaginated = products.slice(offset, offset + limit)

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
        <Box justifyItems='center'>
            <Box
                sx={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 2,
                    maxWidth: '90%'}}>
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
            </Box>
            {sorting && <Box
                    sx={{ display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'}}>
                    <Alert sx={{ alignItems: 'center', mt: 2 }}
                        color='info'>
                            Products sorted {sorted}
                    </Alert>
                </Box>}
            <HandlePagination
                allProducts={productsList}
                limit={limit}
                setPage={setPage}
                page={page}/>
            <Grid2 container
                spacing={1}
                columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
                sx={{
                    gap: 1,
                    justifyContent: 'center'
                    }}>
                {productsPaginated.map(product => (
                    <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
                        key={product.id} 
                        sx={{ display: 'flex', justifyContent: 'center', padding: 0.5 }}>
                        <Link component={RouterLink}
                            to={`/singleproduct/${product.id}`}
                            style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                            sx={{ transition: 'transform 0.2s ease-in-out',
                                justifyItems: 'center',
                                '&:hover': {
                                    transform: 'scale(1.04)'
                                }
                            }}>
                            <Card sx={{ width: { xs: 370, md: 700 },
                                maxWidth: '100%',
                                minHeight: { xs: 370, md: '100%' },
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
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
                                        justifyContent: 'center',
                                        width: '75%',
                                        gap: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Typography >
                                            Price:
                                        </Typography>
                                        <Typography >
                                            <b>{product.price} €</b>
                                        </Typography>
                                    </Box>
                                    {token && <Badge badgeContent={ifInCartQuantity(product.id)} color='error'>
                                        <AddShoppingCartIcon color="info"
                                        onClick={(e) => {e.preventDefault(); addToCart(product)}}
                                        sx={{ transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                                            '&:hover': {
                                                transform: 'scale(1.2)',
                                                color: 'primary.main' }
                                        }}/></Badge>}
                                </Box>
                            </Card>
                        </Link>
                    </Grid2>
                ))}
            </Grid2>
            <HandlePagination
                allProducts={productsList}
                limit={limit}
                setPage={setPage}
                page={page}/>
        </Box>
    )
}

export default RenderProducts
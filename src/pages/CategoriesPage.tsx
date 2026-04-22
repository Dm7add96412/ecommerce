import { Alert, Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid2, Typography } from "@mui/material"
import { useFetchAllCategoriesQuery } from "../redux/api/categoriesApis"
import { Link } from "react-router-dom"

const CategoriesPage = () => {
    const { data, isLoading, isError } = useFetchAllCategoriesQuery()

    return (
        <Grid2 container spacing={3}
            columnSpacing={1}
            rowSpacing={1}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
            sx={{ maxWidth: '100%',
                display: 'flex',
                justifyContent: 'center'}}>
            <Grid2 size={12}
                sx={{ display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2
                 }}>
                {!isLoading &&<Typography variant='h5'>CATEGORIES</Typography>}
                {isLoading && <CircularProgress/>}
                {isError && 
                    <Alert sx={{ alignItems: 'center' }}
                        color="error"
                        variant="standard">
                        Error fetching categories
                    </Alert>}
                {!isLoading && ((data === undefined) || data.length < 1) && <Alert sx={{ alignItems: 'center' }}
                    color="warning"
                    variant="standard">
                    Could not find categories
                    </Alert>}
            </Grid2>
            {data ? (data.map(category => (
                <Grid2 size={{ xs: 4, sm: 4, md: 4, lg: 4 }}
                    key={category.id}
                    sx={{ display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'}}>
                        <Card sx={{ width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center',
                            overflow: 'hidden'
                            }} 
                            component={Link}
                            to={`/categories/${category.id}/products`}
                            style={{ textDecoration: 'none' }}>
                            <CardActionArea>
                                <Box sx={{ overflow: 'hidden' }}>
                                <CardMedia component='img'
                                    image={category.image}
                                    height='140'
                                    alt="Image not found"
                                    sx={{ objectFit: 'cover',
                                        zIndex: 0,
                                        transition: 'transform 0.2s ease-in-out',
                                        transformOrigin: 'center center',
                                        '&:hover': {transform: 'scale(1.1)'}
                                     }}/>          
                                </Box>
                                <CardContent>
                                    <Typography 
                                        variant='body2' 
                                        sx={{ whiteSpace: 'nowrap', 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis' }}>
                                        {category.name.toUpperCase()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                </Grid2>
            ))) : null}
        </Grid2>
    )
}

export default CategoriesPage
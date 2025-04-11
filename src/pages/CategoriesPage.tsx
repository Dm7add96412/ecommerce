import { Alert, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid2, Typography } from "@mui/material"
import { useFetchAllCategoriesQuery } from "../redux/api/categoriesApis"
import { Link } from "react-router-dom"

const CategoriesPage = () => {
    const { data, isLoading, isError } = useFetchAllCategoriesQuery()

    return (
        <Grid2 container spacing={3}
            columnSpacing={1}
            rowSpacing={1}
            columns={{ xs: 3, sm: 6, md: 9, lg: 12 }}
            sx={{ width: '100%',
                display: 'flex',
                justifyContent: 'center'}}>
            <Grid2 size={12}
                sx={{ display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2
                 }}>
                {!isLoading &&<Typography variant='h5'>CATEGORIES</Typography>}
                {isLoading && <CircularProgress/>}
                {isError && <Alert sx={{ alignItems: 'center' }}
                    color="error"
                    variant="standard">     
                    There's been an error </Alert>}
                {!isLoading && ((data === undefined) || data.length < 1) && <Alert sx={{ alignItems: 'center' }}
                    color="warning"
                    variant="standard">
                    Could not find categories
                    </Alert>}
            </Grid2>
            {data ? (data.map(category => (
                <Grid2 size={{ xs: 3, sm: 3, md: 3, lg: 3 }}
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
                                <CardMedia component='img'
                                    image={category.image}
                                    height='140'
                                    sx={{ objectFit: 'cover',
                                        zIndex: 0
                                     }}/>
                                <CardContent>
                                    <Typography variant='body2'>
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
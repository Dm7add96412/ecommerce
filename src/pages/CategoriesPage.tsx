import { Grid2, ImageList, ImageListItem, ImageListItemBar } from "@mui/material"
import { useFetchAllCategoriesQuery } from "../redux/api/categoriesApis"

const CategoriesPage = () => {
    const { data, isLoading, isError } = useFetchAllCategoriesQuery()

    return (
        <ImageList sx={{ width: '100%', height: '100%' }}>

        
            {data && data.map(category => (
                <ImageListItem key={category.image}>
                    <img srcSet={`${category.image}`}/>
                    <ImageListItemBar>
                        
                    </ImageListItemBar>
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default CategoriesPage
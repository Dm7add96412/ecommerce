import { Grid2, Pagination } from "@mui/material"

import PaginationProps from "../types/PaginationProps"

const HandlePagination:React.FC<PaginationProps>  = ({ allProducts, limit, setPage, page }) => {

    return (
        <Grid2 size={12}
            sx={{ display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 1}}>
            <Pagination
                count={Math.ceil((allProducts.length) / limit)}
                page={page}
                onChange={(_, newPage) => {setPage(newPage); window.scrollTo({ top: 0, behavior: 'smooth' })}}/>
        </Grid2>
    )
}

export default HandlePagination
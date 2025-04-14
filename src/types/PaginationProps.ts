import Product from "./Product";

export default interface PaginationProps {
    allProducts: Product[],
    limit: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    page: number
}
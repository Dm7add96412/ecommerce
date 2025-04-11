import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Category from "../../types/Category";
import Product from "../../types/Product";

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/categories' }),
    endpoints: builder => ({
        fetchAllCategories: builder.query<Category[], void>({
            query: () => '/'
        }),
        fetchProductsByCategory: builder.query<Product[], string>({
            query: (categoryId) => `/${categoryId}/products`
        })
    })
})

export const { useFetchAllCategoriesQuery,
    useFetchProductsByCategoryQuery } = categoriesApi
export default categoriesApi
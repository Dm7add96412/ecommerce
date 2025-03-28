import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Category from "../../types/Category";

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/categories' }),
    endpoints: builder => ({
        fetchAllCategories: builder.query<Category[], void>({
            query: () => '/'
        })
    })
})

export const { useFetchAllCategoriesQuery } = categoriesApi
export default categoriesApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Product from "../../types/Product";
import PaginationQuery from "../../types/PaginationQuery";

const productApis = createApi({
    reducerPath: 'productApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/products' }),
    tagTypes: ['Products'],
    endpoints: builder => ({
            fetchAllProductsPagination: builder.query<Product[], PaginationQuery >({
                query: ({ offset, limit }) => `?offset=${offset}&limit=${limit}`,
                providesTags: ['Products']
            }),
            fetchAllProducts: builder.query<Product[], void>({
                query: () => '/',
                providesTags: ['Products']
            }),
            fetchProduct: builder.query<Product, string>({
                query: (id) => `/${id}`,
                providesTags: ['Products']
            }),
            deleteProduct: builder.mutation<boolean, string>({
                query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
                invalidatesTags: ['Products']
            }),
            updateProduct: builder.mutation<Product, Product>({
                query: (product) => ({ url: `/${product.id}`, method: 'PUT', body: product }),
                invalidatesTags: ['Products']
            }),
            addProduct: builder.mutation<Product, Product>({
                query: (product) => ({ url: '/', method: 'POST', body: product }),
                invalidatesTags: ['Products']
            }),
            searchProducts: builder.query<Product[], string>({
                query: (search) => `/?title=${search}`,
                providesTags: ['Products']
            }),
            searchProductsPagination: builder.query<Product[], PaginationQuery>({
                query: ({ offset, limit, search }) => `/?title=${search}&offset=${offset}&limit=${limit}`,
                providesTags: ['Products']
            })
        })
})

export const { useFetchAllProductsPaginationQuery, 
    useFetchAllProductsQuery, 
    useDeleteProductMutation,
    useFetchProductQuery,
    useUpdateProductMutation,
    useAddProductMutation,
    useSearchProductsQuery,
    useSearchProductsPaginationQuery } = productApis
export default productApis
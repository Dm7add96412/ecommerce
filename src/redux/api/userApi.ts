import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import User from "../../types/User";
import UserQuery from "../../types/UserQuery";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/users' }),
    tagTypes: ['User'],
    endpoints: builder => ({
        fetchUser: builder.query<User, UserQuery>({
            query: ({ id, token }) => ({
                url: `/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }}),
            providesTags: ['User']
        }),
        updateUser: builder.mutation<User, UserQuery>({
            query: ({ token, cartItem }) => ({
                url: `/`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: cartItem
            }),
            invalidatesTags: ['User']
        }),
        createUse: builder.mutation<User, User>({
            query: (user) => ({ 
                url: '/',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useFetchUserQuery, useUpdateUserMutation, useCreateUseMutation } = userApi
export default userApi
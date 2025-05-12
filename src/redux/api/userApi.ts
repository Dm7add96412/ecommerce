import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import User from "../../types/User";
import UserQuery from "../../types/UserQuery";

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/users' }),
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
        })
    })
})

export const { useFetchUserQuery, useUpdateUserMutation } = userApi
export default userApi
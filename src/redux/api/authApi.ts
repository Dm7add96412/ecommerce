import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import User from "../../types/User";
import ReturnedUser from "../../types/ReturnedUser";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/login' }),
    tagTypes: ['User'],
    endpoints: builder => ({
        login: builder.mutation<ReturnedUser, User>({
            query: (user) => ({ url:'/', method: 'POST', body: user }),
            invalidatesTags: ['User']
        })
    })
})

export const { useLoginMutation } = authApi
export default authApi
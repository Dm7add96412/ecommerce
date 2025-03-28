import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import User from "../../types/User";

const userApis = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/users' }),
    endpoints: builder => ({
        fetchAllUsers: builder.query<User[], void>({
            query: () => '/'
        })
    })
})

export const { useFetchAllUsersQuery } = userApis
export default userApis
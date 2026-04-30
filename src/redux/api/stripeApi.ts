import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StripeResponse } from "../../types/StripeResponse";
import UserQuery from "../../types/UserQuery";


const stripeApi = createApi({
    reducerPath: 'stripeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/payment' }),
    endpoints: builder => ({
        createPaymentIntent: builder.mutation<StripeResponse, UserQuery>({
            query: ({ token, cart }) => ({
                url: '/',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: cart
            })
        }),
        savePayment: builder.mutation<{ message: string }, UserQuery>({
            query: ({ token, sessionId }) => ({
                url: '/savepayment',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    sessionId: sessionId
                }
            })
        })
    })
})

export const { useCreatePaymentIntentMutation, useSavePaymentMutation } = stripeApi
export default stripeApi
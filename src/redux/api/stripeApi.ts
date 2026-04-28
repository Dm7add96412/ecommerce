import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem } from "../../types/CartItem";
import { StripeResponse } from "../../types/StripeResponse";


const stripeApi = createApi({
    reducerPath: 'stripeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/payment' }),
    endpoints: builder => ({
        createPaymentIntent: builder.mutation<StripeResponse, CartItem[]>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    products: body
                }
            })
        })
    })
})

export const { useCreatePaymentIntentMutation } = stripeApi
export default stripeApi
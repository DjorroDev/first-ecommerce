import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, Order, Transaction } from "../types"; // Define your types accordingly
import { RootState } from "@/app/store";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        credentials: 'same-origin',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Order", "Transaction"],
    endpoints: (builder) => ({
        // Create a new order
        createOrder: builder.mutation<{ message: string; transactionId: number }, { buyerId: number; payment: string; cartItems: CartItem[] }>({
            query: (orderData) => ({
                url: "/orders",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: ["Order", "Transaction"],
        }),
        // Get orders by sellerId
        getOrdersBySellerId: builder.query<Order[], number>({
            query: (sellerId) => `/orders/seller/${sellerId}`,
            transformResponse: (response: { message: string; orders: Order[] }) => response.orders,
            providesTags: ["Order"],
        }),
        // Get transactions by buyerId
        getTransactionsByBuyerId: builder.query<Transaction[], number>({
            query: (buyerId) => ({
                url: `/transactions/buyer/${buyerId}`,
                method: "GET",
            }),
            providesTags: ["Transaction"],
        }),
        // Find orders by transactionId
        getOrdersByTransactionId: builder.query<Order[], number>({
            query: (transactionId) => `/transactions/${transactionId}`,
            providesTags: ["Order"],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersBySellerIdQuery,
    useGetTransactionsByBuyerIdQuery,
    useGetOrdersByTransactionIdQuery,
} = orderApi;

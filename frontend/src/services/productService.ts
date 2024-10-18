import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types';
import { RootState } from '../app/store';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
        credentials: 'same-origin',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => 'items',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getProductBySellerId: builder.query<Product[], number>({
            query: (id) => `items/seller/${id}`,
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `items/${id}`,
            providesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
        addProduct: builder.mutation<Product, FormData>({
            query: (body) => ({
                url: 'items',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Products', id: 'LIST' }],
        }),
        updateProduct: builder.mutation<Product, { id: number, body: FormData }>({
            query: ({ id, body }) => ({
                url: `items/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }],
        }),
        deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Products', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductBySellerIdQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;

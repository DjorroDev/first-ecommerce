import { RootState } from "@/app/store";
import { User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
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
    tagTypes: ["User"],
    endpoints: (builder) => ({

        getUsers: builder.query<User[], void>({
            query: () => "/users",
            // transformResponse: (response: { message: string; users: User[] }) => response.users,
            transformResponse: (response) => response.rows,
            providesTags: ["User"],
        }),

        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`,
            providesTags: ["User"],
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (user) => ({
                url: "/users/create",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),

        updateUser: builder.mutation<User, { id: number, body: Partial<User> }>({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;

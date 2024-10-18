import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout as logoutAction } from "../features/auth/authSlice";
import { RootState } from "../app/store";
import { User } from "@/types"

// Define the types for the API response and request
interface LoginResponse {
    token: string;
    user: User;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterRequest {
    name: string,
    email: string,
    username: string,
    password: string,
    address: string,
    isAdmin: boolean,
    isSeller: boolean,
}

export const authApi = createApi({
    reducerPath: "authApi",
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
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token: data.token, user: data.user }));
                } catch (err) {
                    console.error("Login failed:", err);
                }
            },
        }),
        register: builder.mutation<LoginResponse, RegisterRequest>({
            query: (credentials) => ({
                url: "register",
                method: "POST",
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token: data.token, user: data.user }));
                } catch (err) {
                    console.error("Register failed:", err);
                }
            },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logoutAction());
                } catch (err) {
                    console.error("Logout failed:", err);
                }
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

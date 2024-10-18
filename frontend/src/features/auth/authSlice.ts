import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface


interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
}
// Load auth state from localStorage
const loadAuthState = (): AuthState => {
    try {
        const serializedState = localStorage.getItem("auth");
        if (serializedState === null) {
            return { token: null, user: null, isAuthenticated: false };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return { token: null, user: null, isAuthenticated: false };
    }
};

// Save auth state to localStorage
const saveAuthState = (state: AuthState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("auth", serializedState);
    } catch (err) {
        console.error("Failed to save auth state to localStorage:", err);
    }
};

const initialState: AuthState = loadAuthState()

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string, user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.token;
            saveAuthState(state)
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("cart")
            localStorage.removeItem("auth")
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

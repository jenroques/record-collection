import { createSlice } from "@reduxjs/toolkit";
import { login, logout, authenticate, setIsCreated, clearError } from "../Action/actions"
import { initialState as userInitialState } from "./userSlice";

export const initialState = {
    currentUser: null,
    isLoggedIn: false,
    error: null,
    sessionId: localStorage.getItem("sessionId") || null,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            console.log("Error cleared");
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.sessionId = action.payload.session_id;
            state.isLoggedIn = true;
            state.isCreated = false;
            state.error = null
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.sessionId = null;
            state.setIsCreated = false;
        });
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.sessionId = localStorage.getItem("sessionId");
            state.isLoggedIn = true;
        });
        builder.addCase(authenticate.rejected, (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.sessionId = null;
            localStorage.removeItem("sessionId");
        });
    },
});

export { login, logout, authenticate, setIsCreated, clearError };
export default sessionSlice.reducer;

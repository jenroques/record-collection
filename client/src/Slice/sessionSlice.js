import { createSlice } from "@reduxjs/toolkit";
import { login, logout, authenticate } from "../Action/actions"

export const initialState = {
    currentUser: null,
    isLoggedIn: false,
    error: null,
    sessionId: localStorage.getItem("sessionId") || null,
}

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.sessionId = action.payload.session_id;
            state.isLoggedIn = true;
            console.log(state.currentUser);
            console.log(state.isLoggedIn);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            console.log("Login failed with error:", action.error.message);
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.sessionId = null;
            console.log("Logged in? ", state.isLoggedIn)
            console.log("Sessoon id: ", state.sessionId)
        });
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
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

export { login, logout, authenticate };
export default sessionSlice.reducer;

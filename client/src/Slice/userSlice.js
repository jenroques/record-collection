import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById, createUser, setIsCreated, clearError } from "../Action/actions"

export const initialState = {
    users: [],
    currentUser: null,
    isLoggedIn: false,
    error: null,
    isCreated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action) {
            const { id, user } = action.payload;
            const index = state.findIndex((u) => u.id === id);
            state[index] = { ...user, id };
        },
        createUser: (state, action) => {
            state.push(action.payload);
        },
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            console.log('fetchUsers.fulfilled', action.payload);
            const users = action.payload.map((user) => {
                const { id, ...rest } = user;
                return { ...rest, id };
            });
            console.log("users:", users)
            return { ...state, users }
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.error = action.error.message;
            console.log("Failed to fetch users:", action.error.message);
        });
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { ...user } = action.payload;
            state.users.push(user); // Add new user to the users array
            state.currentUser = action.payload;
            state.isCreated = true;
            state.error = null; // Clear any previous error messages
            console.log("Create User Action a Go")
            console.log("Is Logged in ", state.isLoggedIn)
            console.log(state.currentUser)
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            console.log("Create User failed with error:", action.error.message);
        });
        builder.addCase(clearError, (state) => {
            state.error = null
            console.log("Is this being called?")
        })
    },
});

export default userSlice.reducer

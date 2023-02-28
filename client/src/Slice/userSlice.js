import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById, createUser } from "../Action/actions"

export const initialState = {
    users: [],
};

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUserId(state, action) {
            const { id, user } = action.payload;
            const index = state.findIndex((u) => u.id === id);
            state[index] = { ...user, id };
        },
        addUser: (state, action) => {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload.map((user) => {
                const { id, ...rest } = user;
                return { ...rest, id };
            });
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
            const { id, ...user } = action.payload;
            state.push({ ...user, id });
        });
    },
});


export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById, createUser, login, logout, authenticate, fetchRecords, fetchRecordById } from "../Action/actions"

export const initialState = {
    users: [],
    isLoggedIn: false,
    error: null,
    isCreated: false,
    currentUser: null,
    records: [],
    currentRecord: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action) {
            const { id, user } = action.payload;
            const index = state.users.findIndex((u) => u.id === id);
            state.users[index] = { ...user, id };
        },
        createUser: (state, action) => {
            state.users.push(action.payload);
        },
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
        setRecordId(state, action) {
            const { id, record } = action.payload;
            const index = state.records.findIndex((r) => r.id === id);
            state.records[index] = { ...record, id };
        },
        setCurrentRecord: (state, action) => {
            state.currentRecord = [action.payload];
        },
        createRecord: (state, action) => {
            state.records.push(action.payload);
            console.log("Add Record triggered in Slice")

        },
        deleteRecord: (state, action) => {
            state.records = state.records.filter((record) => record.id !== action.payload);
        },
        editRecord: (state, action) => {
            const updatedRecord = action.payload;
            const index = state.records.findIndex((record) => record.id === updatedRecord.id);
            if (index !== -1) {
                state.records = [
                    ...state.records.slice(0, index),
                    updatedRecord,
                    ...state.records.slice(index + 1),
                ];
                state.currentRecord = updatedRecord;
            }
        },
        addRecordToCollection: (state, action) => {
            const { id, collection_id } = action.payload;
            const record = state.records.find((r) => r.id === id);
            if (record) {
                record.collection_id = collection_id;
            }
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
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { ...user } = action.payload;
            state.users.push({ ...user });
            state.isCreated = true;
            state.error = null;
            console.log("Create User Action a Go")
            console.log("Is Logged in ", state.isLoggedIn)
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            console.log("Create User failed with error:", action.error.message);
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            console.log(state.currentUser)
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
            state.isCreated = false;
        });
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.isLoggedIn = true;
        });
        builder.addCase(authenticate.rejected, (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        });
        builder.addCase(fetchRecords.fulfilled, (state, action) => {
            console.log('fetchRecords.fulfilled:', action.payload);
            const records = action.payload.map((record) => {
                const { id, ...rest } = record;
                return { ...rest, id };
            });
            console.log('records:', records);
            return { ...state, records };
        });
        builder.addCase(fetchRecordById.fulfilled, (state, action) => {
            state.currentRecord = action.payload;
        });
    },
});

export default userSlice.reducer

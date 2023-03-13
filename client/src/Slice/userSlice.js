import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById, createUser, login, logout, authenticate, fetchRecords, fetchRecordById, createRecord } from "../Action/actions"

export const initialState = {
    users: [],
    isLoggedIn: false,
    error: null,
    isCreated: false,
    currentUser: null,
    records: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.users.push(action.payload);
        },
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
        createRecord: (state, action) => {
            const newRecord = action.payload.record;
            const updatedRecords = [...state.records, newRecord]; // add new record to state.records array
            const updatedUser = {
                ...state.currentUser,
                records: [...state.currentUser.records, newRecord], // add new record to currentUser.records array
            };
            state.records = updatedRecords;
            state.currentUser = updatedUser;
            state.recordCreated = true;
        },
        deleteRecord: (state, action) => {
            const deletedRecordId = action.payload;
            state.records = state.records.filter((record) => record.id !== deletedRecordId);
            if (state.currentUser) {
                state.currentUser.records = state.currentUser.records.filter((id) => id !== deletedRecordId);
            }
            state.records.push()
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
        // addRecordToCollection: (state, action) => {
        //     const { id, collection_id } = action.payload;
        //     const recordIndex = state.currentUser.records.findIndex((r) => r.id === id);
        //     const collectionIndex = state.currentUser.collections.findIndex((c) => c.id === collection_id);
        //     if (recordIndex !== -1 && collectionIndex !== -1) {
        //         state.currentUser.records[recordIndex].collection_id = collection_id;
        //         state.currentUser.collections[collectionIndex].records.push(id);
        //     }
        // },
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
            state.isLoggedIn = true;
            state.isCreated = false;
            state.error = null;
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
        builder.addCase(fetchRecords.fulfilled, (state, action) => {
            console.log('fetchRecords.fulfilled:', action.payload);
            const records = action.payload.map((record) => {
                const { id, ...rest } = record;
                return { ...rest, id };
            });
            console.log('records:', records);
            return { ...state, records };
        });
        builder.addCase(createRecord.fulfilled, (state, action) => {
            const newRecord = action.payload.record;
            const updatedRecords = [...state.currentUser.records, newRecord];
            const updatedUser = {
                ...state.currentUser,
                records: updatedRecords,
            };
            state.currentUser = updatedUser;
            state.recordCreated = true;
        })
    },
});

export default userSlice.reducer

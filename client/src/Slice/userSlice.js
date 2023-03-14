import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, createUser, login, logout, fetchRecords, fetchCollections, createRecord, createCollection } from "../Action/actions"

export const initialState = {
    users: [],
    isLoggedIn: false,
    error: null,
    isCreated: false,
    currentUser: null,
    records: [],
    collections: [],
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
            const updatedRecords = [...state.records, newRecord];
            const updatedUser = {
                ...state.currentUser,
                records: updatedRecords,
            };
            state.records = updatedRecords;
            state.currentUser = updatedUser;
            state.recordCreated = true;

            const { collection_id } = newRecord;
            const collectionIndex = state.collections.findIndex((c) => c.id === collection_id);
            console.log(state.collections)
            if (collectionIndex !== -1) {
                const recordIds = state.collections[collectionIndex].records;
                if (!recordIds.includes(newRecord.id)) {
                    state.collections[collectionIndex].records = [...recordIds, newRecord.id];
                }
            }
            console.log(state.collections)
        },
        deleteRecord: (state, action) => {
            const deletedRecordId = action.payload;
            state.records = state.records.filter((record) => record.id !== deletedRecordId);
            if (state.currentUser) {
                state.currentUser.records = state.currentUser.records.filter((record) => record.id !== deletedRecordId);
            }
            state.records.push()
        },
        editRecord: (state, action) => {
            const updatedRecord = action.payload;
            const index = state.records.findIndex((record) => record.id === updatedRecord.id);
            if (index !== -1) {
                state.records[index] = updatedRecord;
            }
        }
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
        })
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            console.log('fetchCollections.fulfilled:', action.payload);
            const collections = action.payload.map((collection) => {
                const { id, ...rest } = collection;
                return { ...rest, id };
            });
            console.log('collections:', collections);
            return { ...state, collections };
        });
        builder.addCase(createCollection.fulfilled, (state, action) => {
            const newCollection = action.payload.collection;

            // Push the new collection to the collections array
            state.collections.push(newCollection);

            // Update the collection_id of any records that belong to the new collection
            const { records } = newCollection;
            if (records && records.length > 0) {
                const recordIds = records.map((r) => r.id);
                state.records.forEach((record) => {
                    if (recordIds.includes(record.id)) {
                        record.collection_id = newCollection.id;
                    }
                });
            }

            // Update the collection_id of any records that already belong to a collection
            // but are not included in the new collection
            state.collections.forEach((collection) => {
                if (collection.id !== newCollection.id) {
                    const { records } = collection;
                    if (records && records.length > 0) {
                        const recordIds = records.map((r) => r.id);
                        state.records.forEach((record) => {
                            if (recordIds.includes(record.id)) {
                                if (record.collection_id === newCollection.id) {
                                    record.collection_id = null;
                                }
                            }
                        });
                    }
                }
            });
        });
    },
});

export default userSlice.reducer

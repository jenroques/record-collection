import { createSlice } from "@reduxjs/toolkit";
import { fetchCollections, fetchCollectionById, editCollection, deleteCollection, addRecordToCollection, deleteRecordFromCollection, createCollection } from "../Action/actions"

export const initialState = {
    collections: [],
};

export const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        createCollection: (state, action) => {
            const newCollection = action.payload.collection;
            console.log('newCollection:', newCollection);
            const updatedCollections = [...state.collections, newCollection];
            state.collections = updatedCollections;

            // Update the collection_id of any records that belong to the new collection
            const { records } = newCollection;
            if (records && records.length > 0) {
                const recordIds = records.map((r) => r.id);
                state.records.forEach((record) => {
                    if (recordIds.includes(record.id) && !record.collection_id) {
                        record.collection_id = newCollection.id;
                    }
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            console.log('fetchCollections.fulfilled:', action.payload);
            const collections = action.payload.map((collection) => {
                const { id, ...rest } = collection;
                return { ...rest, id };
            });
            return { ...state, collections }
        });

    },
});

export default collectionSlice.reducer;

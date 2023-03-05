import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCollections, fetchCollectionById, editCollection, deleteCollection, addRecordToCollection, deleteRecordFromCollection } from "../Action/actions"

export const initialState = {
    collections: [],
    currentCollection: [],
};

export const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollectionId(state, action) {
            const { id, collection } = action.payload;
            const index = state.collections.findIndex((c) => c.id === id);
            if (index !== -1) {
                state.collections[index] = { ...collection, id };
            }
        },
        setCurrentCollection(state, action) {
            state.currentCollection = action.payload;
        },
        createCollection(state, action) {
            state.collections.push(action.payload);
        },
        deleteCollection(state, action) {
            return {
                ...state,
                collections: state.collections.filter((collection) => collection.id !== action.payload.id),
            };
        },
        editCollection(state, action) {
            const { id, ...updatedFields } = action.payload;
            const collectionIndex = state.collections.findIndex(
                (collection) => collection.id === id
            );
            state.collections[collectionIndex] = {
                ...state.collections[collectionIndex],
                ...updatedFields,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollections.fulfilled, (state, action) => {
            console.log('fetchCollections.fulfilled', action.payload);
            const collections = action.payload.map((collection) => {
                const { id, ...rest } = collection;
                return { ...rest, id };
            });
            console.log("collections:", collections)
            return { ...state, collections }
        });
        builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
            state.currentCollection = action.payload;
        });
    },
});

export default collectionSlice.reducer;

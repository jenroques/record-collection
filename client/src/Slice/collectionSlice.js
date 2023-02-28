import { createSlice } from "@reduxjs/toolkit";
import { fetchCollections, fetchCollectionById, updateCollection, deleteCollection, addRecordToCollection, deleteRecordFromCollection } from "../Action/actions"

export const initialState = {
    collections: [],
    currentCollection: {},
}

export const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollectionId(state, action) {
            const { id, collection } = action.payload;
            const index = state.findIndex((c) => c.id === id);
            state[index] = { ...collection, id };
        },
        setCurrentCollection: (state, action) => {
            state.currentCollection = action.payload;
        },
        addCollection: (state, action) => {
            state.push(action.payload);
        },
        deleteCollection: (state, action) => {
            return state.filter((collection) => collection.id !== action.payload.id);
        },
        updateCollection: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const collectionIndex = state.findIndex(
                (collection) => collection.id === id
            );
            state[collectionIndex] = { ...state[collectionIndex], ...updatedFields };
        },
        extraReducers: (builder) => {
            builder.addCase(fetchCollections.fulfilled, (state, action) => {
                return action.payload.map((collection) => {
                    const { id, ...rest } = collection;
                    return { ...rest, id };
                });
            });
            builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
                const { id } = action.payload;
                const index = state.findIndex((collection) => collection.id === id);
                if (index !== -1) {
                    state[index] = action.payload;
                } else {
                    state.push(action.payload);
                }
            });
            builder.addCase(updateCollection.fulfilled, (state, action) => {
                const collection = action.payload;
                const index = state.findIndex((c) => c.id === collection.id);
                if (index !== -1) {
                    state[index] = collection;
                }
            });
            builder.addCase(deleteCollection.fulfilled, (state, action) => {
                const collectionId = action.payload.id;
                return state.filter((c) => c.id !== collectionId);
            });
            builder.addCase(addRecordToCollection.fulfilled, (state, action) => {
                const { recordId, collectionId } = action.payload;
                const collectionIndex = state.findIndex(
                    (collection) => collection.id === collectionId
                );
                state[collectionIndex].recordIds.push(recordId);
            });
            builder.addCase(deleteRecordFromCollection.fulfilled, (state, action) => {
                const { collectionId, recordId } = action.payload;
                const collectionIndex = state.collections.findIndex(
                    (collection) => collection.id === collectionId
                );
                const recordIndex = state.collections[
                    collectionIndex
                ].records.findIndex((record) => record.id === recordId);
                state.collections[collectionIndex].records.splice(recordIndex, 1);
            });
        },
    },
});

export default collectionSlice.reducer

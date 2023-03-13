import { createSlice } from "@reduxjs/toolkit";
import { fetchCollections, fetchCollectionById, editCollection, deleteCollection, addRecordToCollection, deleteRecordFromCollection } from "../Action/actions"

export const initialState = {
    collections: [],
};

export const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        createCollection(state, action) {
            const newCollection = {
                ...action.payload,
            };
            state.currentUser.collections.push(newCollection);
        },
        deleteCollection(state, action) {
            const { id } = action.payload;
            const currentUserIndex = state.user.users.findIndex((user) => user.id === state.user.currentUser.id);
            if (currentUserIndex !== -1) {
                const updatedCollections = state.user.currentUser.collections.filter(
                    (collection) => collection.id !== id
                );
                const updatedCurrentUser = {
                    ...state.user.currentUser,
                    collections: updatedCollections,
                };
                return {
                    ...state,
                    user: {
                        ...state.user,
                        currentUser: updatedCurrentUser,
                    },
                    collections: state.collections.filter((collection) => collection.id !== id),
                };
            }
            return state;
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
        // builder.addCase(fetchCollections.fulfilled, (state, action) => {
        //     const collections = action.payload.map((collection) => {
        //         const { id, ...rest } = collection;
        //         return { ...rest, id };
        //     });
        //     return { ...state, collections }
        // });
        builder.addCase(fetchCollectionById.fulfilled, (state, action) => {
            state.currentCollection = action.payload;
        });
    },
});

export default collectionSlice.reducer;

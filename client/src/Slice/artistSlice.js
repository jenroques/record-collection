import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists, fetchCollectionById, deleteArtist, deleteArtistFromRecord } from "../Action/actions";

export const initialState = {
    artists: [],
};

export const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        setArtistId(state, action) {
            const { id, artist } = action.payload;
            const index = state.findIndex((a) => a.id === id);
            state[index] = { ...artist, id };
        },
        addArtist: (state, action) => {
            state.push(action.payload);
        },
        deleteArtist: (state, action) => {
            return state.filter((collection) => collection.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            return action.payload.map((artist) => {
                const { id, ...rest } = artist;
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
        builder.addCase(deleteArtist.fulfilled, (state, action) => {
            const artistId = action.payload.id;
            return state.filter((a) => a.id !== artistId);
        });
        builder.addCase(deleteArtistFromRecord.fulfilled, (state, action) => {
            const artistId = action.payload.id;
            return state.filter((artist) => artist.id !== artistId);
        });
    },
});

export default artistSlice.reducer

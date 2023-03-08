import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists, fetchArtistById, deleteArtist, deleteArtistFromRecord, editArtist, createArtist } from "../Action/actions";

export const initialState = {
    artists: [],
    currentArtist: [],
    status: null,
    error: null
};

export const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        setArtistId(state, action) {
            const { id, artist } = action.payload;
            const index = state.artists.findIndex((a) => a.id === id);
            if (index !== -1) {
                state.artists[index] = { ...artist, id };
            }
            return state;
        },
        createArtist: (state, action) => {
            state.artists.push(action.payload);
        },
        deleteArtist: (state, action) => {
            return {
                ...state,
                artists: state.artists.filter((artist) => artist.id !== action.payload.id),
            };
        },
        editArtist: (state, action) => {
            const updatedArtist = action.payload;
            const index = state.artists.findIndex((artist) => artist.id === updatedArtist.id);
            if (index !== -1) {
                state.artists = [
                    ...state.artists.slice(0, index),
                    updatedArtist,
                    ...state.artists.slice(index + 1),
                ];
            }
        }, addArtistToRecord: (state, action) => {
            const { id, name } = action.payload;
            const artistIndex = state.artists.findIndex(artist => artist.name === name);
            if (artistIndex === -1) {
                // If the artist is not already in the array, add them as a new object
                state.artists.push({ name: name, records: [id] });
            } else {
                // If the artist is already in the array, update their record list
                state.artists = state.artists.map((artist, index) =>
                    index === artistIndex ? { ...artist, records: [...artist.records, id] } : artist
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            const artists = action.payload.map((artist) => {
                const { id, ...rest } = artist;
                return { ...rest, id };
            });
            return { ...state, artists };
        });
        builder.addCase(fetchArtistById.fulfilled, (state, action) => {
            const { payload } = action;
            state.currentArtist = payload;
        });
        builder.addCase(deleteArtistFromRecord.fulfilled, (state, action) => {
            const artistId = action.payload.id;
            return {
                ...state,
                artists: state.artists.filter((artist) => artist.id !== artistId),
            };
        });
    },
});

export const { setArtistId, addArtist } = artistSlice.actions;
export default artistSlice.reducer;

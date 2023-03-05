import { createSlice } from "@reduxjs/toolkit";
import { fetchArtists, fetchArtistById, deleteArtist, deleteArtistFromRecord, editArtist } from "../Action/actions";

export const initialState = {
    artists: [],
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
        addArtist: (state, action) => {
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            console.log('fetchArtists.fulfilled:', action.payload);
            const artists = action.payload.map((artist) => {
                const { id, ...rest } = artist;
                return { ...rest, id };
            });
            console.log('artists:', artists);
            return { ...state, artists };
        });
        builder.addCase(fetchArtistById.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.artists.findIndex((artist) => artist.id === id);
            if (index !== -1) {
                state.artists[index] = action.payload;
            } else {
                state.artists.push(action.payload);
            }
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

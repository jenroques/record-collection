import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    records: [],
    collections: [],
    artists: [],
    users: [],
    session: null,
};

// Define the reducers for adding, updaing and deleting records
const recordsSlice = createSlice({
    name: 'records',
    initialState: [],
    reducers: {
        addRecord: (state, action) => {
            state.push(action.payload);
        },
        deleteRecord: (state, action) => {
            return state.filter((record) => record.id !== action.payload.id);
        },
        updateRecord: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const recordIndex = state.findIndex((record) => record.id === id);
            state[recordIndex] = { ...state[recordIndex], ...updatedFields };
        }
    }
});

// Defin the reducers for adding and deleting collections
const collectionsSlice = createSlice({
    name: 'collections',
    initialState: [],
    reducers: {
        addCollection: (state, action) => {
            state.push(action.payload);
        },
        deleteCollection: (state, action) => {
            return state.filter((collection) => collection.id !== action.payload.id);
        },
        updateCollection: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const collectionIndex = state.findIndex((collection) => collection.id === id);
            state[collectionIndex] = { ...state[collectionIndex], ...updatedFields };
        },
        addRecordToCollection: (state, action) => {
            const { recordId, collectionId } = action.payload;
            const collection = state.find((collection) => collection.id === collectionId);
            if (collection) {
                collection.records.push(recordId);
            }
        },
    },
});

// Define the reducers for adding and deleting artists
const artistsSlice = createSlice({
    name: 'artists',
    initialState: [],
    reducers: {
        addArtist: (state, action) => {
            state.push(action.payload);
        },
        deleteArtist: (state, action) => {
            return state.filter((artist) => artist.id !== action.payload.id);
        },
        updateArtist: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            const artistIndex = state.findIndex((artist) => artist.id === id);
            state[artistIndex] = { ...state[artistIndex], ...updatedFields };
        },
        addArtistToRecord: (state, action) => {
            const { artistId, recordId } = action.payload;
            const record = state.find((record) => record.id === recordId);
            if (record) {
                record.artist_id = artistId;
            }
        },
    },
});

// Define the reducers for addingusers
const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
    },
});

// Define the reducer for handling sessions
const sessionSlice = createSlice({
    name: 'session',
    initialState: null,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: (state, action) => {
            return null;
        },
    },
});

const reducer = {
    records: recordsSlice.reducer,
    collections: collectionsSlice.reducer,
    artists: artistsSlice.reducer,
    users: usersSlice.reducer,
    session: sessionSlice.reducer,
};

const store = configureStore({
    reducer,
})

export const { login, logout } = sessionSlice.actions;
export const { addRecord, deleteRecord, updateRecord, addArtistToRecord } = recordsSlice.actions;
export const { addCollection, deleteCollection, updateCollection, addRecordToCollection } = collectionsSlice.actions;
export const { addArtist } = artistsSlice.actions;
export default store;

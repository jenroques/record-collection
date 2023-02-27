import {
    configureStore,
    createAsyncThunk,
    createSlice,
    combineReducers,
} from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { push } from 'connected-react-router';

const initialState = {
    records: [],
    collections: [],
    artists: [],
    users: [],
    currentRecord: {},
    currentCollection: {},
    currentUser: null,
    isLoggedIn: false,
    error: null,
    sessionId: localStorage.getItem("sessionId") || null,
};

// CREATE SESSION FOR LOGIN

export const login = createAsyncThunk("session/login", async (credentials) => {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error[0]);
        }
        const { user, session_id } = await response.json();
        localStorage.setItem("sessionId", session_id);
        console.log("login response: ", user);
        return { user, session_id };
    } catch (error) {
        console.log("Error:", error);
        return Promise.reject(error);
    }
});

export const logout = createAsyncThunk(
    "session/logout",
    async (_, { dispatch }) => {
        const response = await fetch('/logout', {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to logout');
        }

        localStorage.removeItem('authToken');

        // Redirect to the login page
        dispatch(push('/login'));

        return null;
    });

export const authenticate = createAsyncThunk(
    "session/authenticate",
    async () => {
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                throw new Error("No sessionId found");
            }
            const response = await fetch("/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to authenticate");
            }
            const user = await response.json();
            return user;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

// SESSIONS SLICE WITH REDUCERS

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.sessionId = action.payload.session_id;
            state.isLoggedIn = true;
            console.log(state.currentUser);
            console.log(state.isLoggedIn);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
            console.log("Login failed with error:", action.error.message);
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.sessionId = null;
        });
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.currentUser = action.payload.user;
            state.sessionId = localStorage.getItem("sessionId");
            state.isLoggedIn = true;
        });
        builder.addCase(authenticate.rejected, (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
            state.sessionId = null;
            localStorage.removeItem("sessionId");
        });
    },
});

// USERS

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("/users");
    const data = await response.json();
    return data;
});

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id) => {
        const response = await fetch(`/users/${id}`);
        const data = await response.json();
        return data;
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async (userData) => {
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return data;
    }
);

// USER SLICE WITH REDUCERS

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUserId(state, action) {
            const { id, user } = action.payload;
            const index = state.findIndex((u) => u.id === id);
            state[index] = { ...user, id };
        },
        addUser: (state, action) => {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload.map((user) => {
                const { id, ...rest } = user;
                return { ...rest, id };
            });
        });
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { id, ...user } = action.payload;
            state.push({ ...user, id });
        });
    },
});

// RECORDS

export const fetchRecords = createAsyncThunk(
    "records/fetchFecords",
    async () => {
        const response = await fetch("/records");
        const data = await response.json();
        return data;
    }
);

export const fetchRecordById = createAsyncThunk(
    "records/fetchRecordById",
    async (id) => {
        const response = await fetch(`/records/${id}`);
        const data = await response.json();
        return data;
    }
);

export const createRecord = createAsyncThunk(
    "records/createRecord",
    async (recordData) => {
        const response = await fetch("/records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recordData),
        });
        const data = await response.json();
        return data;
    }
);

export const updateRecord = createAsyncThunk(
    "records/updateRecord",
    async (recordData) => {
        const response = await fetch(`/records/${recordData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recordData),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteRecord = createAsyncThunk(
    "records/deleteRecord",
    async (id) => {
        const response = await fetch(`/records/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
);

const recordsSlice = createSlice({
    name: "records",
    initialState: [],
    reducers: {
        setRecordId(state, action) {
            const { id, record } = action.payload;
            const index = state.findIndex((r) => r.id === id);
            state[index] = { ...record, id };
        },
        setCurrentRecord: (state, action) => {
            state.currentRecord(action.payload);
        },
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
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecords.fulfilled, (state, action) => {
            return action.payload.map((record) => {
                const { id, ...rest } = record;
                return { ...rest, id };
            });
        });
        builder.addCase(fetchRecordById.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((record) => record.id === id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createRecord.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(updateRecord.fulfilled, (state, action) => {
            const { id } = action.payload;
            const index = state.findIndex((record) => record.id === id);
            state[index] = action.payload;
        });
        builder.addCase(deleteRecord.fulfilled, (state, action) => {
            return state.filter((record) => record.id !== action.payload.id);
        });
    },
});

// COLLECTIONS

export const fetchCollections = createAsyncThunk(
    "collections/fetchCollections",
    async () => {
        const response = await fetch("/collections");
        const data = await response.json();
        return data;
    }
);

export const fetchCollectionById = createAsyncThunk(
    "collections/fetchCollectionById",
    async (id) => {
        const response = await fetch(`/collections/${id}`);
        const data = await response.json();
        return data;
    }
);

export const createCollection = createAsyncThunk(
    "collections/createCollection",
    async (collectionData) => {
        const response = await fetch("/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionData),
        });
        const data = await response.json();
        return data;
    }
);

export const updateCollection = createAsyncThunk(
    "collections/updateCollection",
    async (collectionData) => {
        const response = await fetch(`/collections/${collectionData.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(collectionData),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteCollection = createAsyncThunk(
    "collections/deleteCollection",
    async (id) => {
        const response = await fetch(`/collections/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
);

export const addRecordToCollection = createAsyncThunk(
    "collections/addRecordToCollection",
    async ({ recordId, collectionId }) => {
        const response = await fetch(`/addtocollection`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ recordId }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    }
);

export const deleteRecordFromCollection = createAsyncThunk(
    "collections/deleteRecordFromCollection",
    async ({ recordId, collectionId }) => {
        const response = await fetch(`/deletefromrecord`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
);

const collectionsSlice = createSlice({
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

// ARTISTS

export const fetchArtists = createAsyncThunk(
    "artists/fetchArtists",
    async () => {
        const response = await fetch("/collections");
        const data = await response.json();
        return data;
    }
);

export const fetchArtistById = createAsyncThunk(
    "artists/fetchArtistById",
    async (artistId) => {
        const response = await fetch(`/artists/${artistId}`);
        const data = await response.json();
        return data;
    }
);

export const createArtist = createAsyncThunk(
    "artists/createArtist",
    async (artistData) => {
        const response = await fetch("/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(artistData),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteArtist = createAsyncThunk(
    "artists/deleteArtist",
    async (artistId) => {
        const response = await fetch(`/artists/${artistId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
);

export const addArtistToRecord = createAsyncThunk(
    "records/addArtistToRecord",
    async ({ recordId, artistId }) => {
        const response = await fetch("/addtorecord", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ record_id: recordId, artist_id: artistId }),
        });
        const data = await response.json();
        return data;
    }
);

export const deleteArtistFromRecord = createAsyncThunk(
    "records/deletefromrecord",
    async () => {
        const response = await fetch("/deletefromrecord", {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    }
);

const artistSlice = createSlice({
    name: "artists",
    initialState: [],
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

const rootReducer = combineReducers({
    records: recordsSlice.reducer,
    collections: collectionsSlice.reducer,
    artists: artistSlice.reducer,
    users: usersSlice.reducer,
    session: sessionSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor, rootReducer };

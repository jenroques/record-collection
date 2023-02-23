import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    records: [],
    collections: [],
    artists: [],
    users: [],
    currentRecord: {},
    currentCollection: {},
    currentUser: null,
    isLoggedIn: false
};

// USERS

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("/users");
    const data = await response.json();
    return data
})

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (userId) => {
    const response = await fetch(`/users/${userId}`);
    const data = await response.json();
    return data
})

export const createUser = createAsyncThunk("users/createUser", async (userData) => {
    const response = await fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
})


// CREATE SESSION FOR LOGIN

export const login = createAsyncThunk("session/login", async (credentials) => {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
});

export const logout = createAsyncThunk("session/logout", async () => {
    const response = await fetch("/session", {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
});

// USER SLICE WITH REDUCERS

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            const index = state.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            } else {
                state.push(action.payload);
            }
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        })
    }
});

// SESSIONS SLICE WITH REDUCERS

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        });
    },
});

// RECORDS

export const fetchRecords = createAsyncThunk("records/fetchFecords", async () => {
    const response = await fetch("/records");
    const data = await response.json();
    return data
});

export const fetchRecordById = createAsyncThunk("records/fetchRecordById", async (recordId) => {
    const response = await fetch(`/records/${recordId}`);
    const data = await response.json();
    return data
})

export const createRecord = createAsyncThunk("records/createRecord", async (recordData) => {
    const response = await fetch("/records", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
    });
    const data = await response.json();
    return data;
})

export const updateRecord = createAsyncThunk("records/updateRecord", async (recordData) => {
    const response = await fetch(`/records/${recordData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
    });
    const data = await response.json();
    return data;
})

export const deleteRecord = createAsyncThunk("records/deleteRecord", async (recordId) => {
    const response = await fetch(`/records/${recordId}`, {
        method: "DELETE",
    });
    const data = await response.json()
    return data;
});

const recordsSlice = createSlice({
    name: "records",
    initialState: [],
    reducers: {
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
            return action.payload;
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
            return state.filter((record) => record.id !== action.payload.id)
        })
    }
})

// COLLECTIONS

export const fetchCollections = createAsyncThunk("collections/fetchCollections", async () => {
    const response = await fetch("/collections");
    const data = await response.json();
    return data
})

export const fetchCollectionById = createAsyncThunk("collections/fetchCollectionById", async (collectionId) => {
    const response = await fetch(`/collections/${collectionId}`);
    const data = await response.json();
    return data
})

export const createCollection = createAsyncThunk("collections/createCollection", async (collectionData) => {
    const response = await fetch("/collections", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
    });
    const data = await response.json();
    return data;
})

export const updateCollection = createAsyncThunk("collections/updateCollection", async (collectionData) => {
    const response = await fetch(`/collections/${collectionData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
    });
    const data = await response.json();
    return data;
})

export const deleteCollection = createAsyncThunk("collections/deleteCollection", async (collectionId) => {
    const response = await fetch(`/collections/${collectionId}`, {
        method: "DELETE",
    });
    const data = await response.json()
    return data;
});

export const addRecordToCollection = createAsyncThunk("collections/addRecordToCollection", async ({ recordId, collectionId }) => {
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
})

export const deleteRecordFromCollection = createAsyncThunk("collections/deleteRecordFromCollection", async ({ recordId, collectionId }) => {
    const response = await fetch(`/deletefromrecord`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data
})

const collectionsSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
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
            const collectionIndex = state.findIndex((collection) => collection.id === id);
            state[collectionIndex] = { ...state[collectionIndex], ...updatedFields };
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchCollections.fulfilled, (state, action) => {
                    return action.payload;
                })
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
            })
            builder.addCase(deleteCollection.fulfilled, (state, action) => {
                const collectionId = action.payload.id;
                return state.filter((c) => c.id !== collectionId);
            });
            builder.addCase(addRecordToCollection.fulfilled, (state, action) => {
                const { recordId, collectionId } = action.payload;
                const collectionIndex = state.findIndex((collection) => collection.id === collectionId);
                state[collectionIndex].recordIds.push(recordId)
            })
            builder.addCase(deleteRecordFromCollection.fulfilled, (state, action) => {
                const { collectionId, recordId } = action.payload;
                const collectionIndex = state.collections.findIndex((collection) => collection.id === collectionId);
                const recordIndex = state.collections[collectionIndex].records.findIndex((record) => record.id === recordId);
                state.collections[collectionIndex].records.splice(recordIndex, 1);
            });
        },
    },
});



// ARTISTS


export const fetchArtists = createAsyncThunk("artists/fetchArtists", async () => {
    const response = await fetch("/collections");
    const data = await response.json();
    return data
})

export const fetchArtistById = createAsyncThunk("artists/fetchArtistById", async (artistId) => {
    const response = await fetch(`/artists/${artistId}`);
    const data = await response.json();
    return data
})

export const createArtist = createAsyncThunk("artists/createArtist", async (artistData) => {
    const response = await fetch("/artists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(artistData),
    });
    const data = await response.json();
    return data;
})

export const deleteArtist = createAsyncThunk("artists/deleteArtist", async (artistId) => {
    const response = await fetch(`/artists/${artistId}`, {
        method: "DELETE",
    });
    const data = await response.json()
    return data;
});

export const addArtistToRecord = createAsyncThunk("records/addArtistToRecord", async ({ recordId, artistId }) => {
    const response = await fetch('/addtorecord', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ record_id: recordId, artist_id: artistId }),
    });
    const data = await response.json();
    return data;
})

export const deleteArtistFromRecord = createAsyncThunk("records/deletefromrecord", async () => {
    const response = await fetch('/deletefromrecord', {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
})

const artistSlice = createSlice({
    name: "artists",
    initialState: [],
    reducers: {
        addArtist: (state, action) => {
            state.push(action.payload);
        },
        deleteArtist: (state, action) => {
            return state.filter((collection) => collection.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            return action.payload;
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


const reducer = {
    records: recordsSlice.reducer,
    collections: collectionsSlice.reducer,
    artists: artistSlice.reducer,
    users: usersSlice.reducer,
    session: sessionSlice.reducer,
};

const store = configureStore({
    reducer,
})

export default store;

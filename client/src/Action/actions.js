import { createAsyncThunk } from "@reduxjs/toolkit";

// UTILITY FUNCTIONS

export const setLoggedIn = (isLoggedIn) => ({
    type: "SET_LOGGED_IN",
    payload: isLoggedIn,
});

export const setIsCreated = (value) => ({
    type: "user/setIsCreated",
    payload: value,
});

export const clearError = (value) => ({
    type: 'CLEAR_ERROR',
    payload: value,
});

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
        const user = await response.json();
        console.log("login response: ", user);
        return user;
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
        localStorage.removeItem('sessionId');
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

// USERS

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await fetch("/users");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
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

        if (!response.ok) {
            const error = await response.json();
            return Promise.reject(new Error(error.error[0]));
        }

        const data = await response.json();
        return data;
    }
);

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
        try {
            console.log("Sending createRecord request:", recordData);
            const response = await fetch("/records", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recordData),
            });
            const data = await response.json();
            console.log("createRecord response:", data);
            return data;
        } catch (error) {
            console.error("Error creating record:", error);
            throw error;
        }
    }
);


export const editRecord = createAsyncThunk(
    "records/editRecord",
    async ({ id, title, image_url }) => {
        const response = await fetch(`/records/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, image_url }),
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
    async ({ name, user_id }) => {
        const response = await fetch("/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, user_id }),
        });
        const data = await response.json();
        return data;
    }
);

export const editCollection = createAsyncThunk(
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
    async (id, { rejectWithValue }) => {
        const response = await fetch(`/collections/${id}`);
        const collection = await response.json();
        if (collection.records.length > 0) {
            return rejectWithValue("Can only delete collection when all records have been moved");
        }
        const deleteResponse = await fetch(`/collections/${id}`, {
            method: "DELETE",
        });
        const data = await deleteResponse.json();
        return data;
    }
);

export const addRecordToCollection = createAsyncThunk(
    "collections/addRecordToCollection",
    async ({ id, collection_id }) => {
        const response = await fetch(`addtocollection`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, collection_id }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }
        return data;
    }
);


// ARTISTS

export const fetchArtists = createAsyncThunk(
    "artists/fetchArtists",
    async () => {
        const response = await fetch("/artists");
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
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log(errorResponse.error)
            return errorResponse.error;
        }
        const artist = await response.json();
        return artist;
    }
);

export const editArtist = createAsyncThunk(
    "artists/editArtist",
    async ({ id, name, image_url }) => {
        const response = await fetch(`/artists/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, image_url }),
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
    async ({ id, name }) => {
        const response = await fetch('/addtorecord', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                name
            }),
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

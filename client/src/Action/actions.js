import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

export const goToPage = (path) => {
    // navigate to the specified path
    history.push(path);
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
        localStorage.removeItem('sessionId');
        // Redirect to the login page
        dispatch(goToPage('/login'));

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

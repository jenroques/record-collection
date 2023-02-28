import {
    configureStore,
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

import { sessionSlice } from '../Slice/sessionSlice'
import { userSlice } from '../Slice/userSlice'
import { collectionSlice } from '../Slice/collectionSlice'
import { recordSlice } from '../Slice/recordSlice'
import { artistSlice } from '../Slice/artistSlice'

import { login, logout, authenticate } from '../Action/actions'

import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    records: recordSlice.reducer,
    collections: collectionSlice.reducer,
    artists: artistSlice.reducer,
    users: userSlice.reducer,
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

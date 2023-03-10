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

import { userSlice } from '../Slice/userSlice'
import { collectionSlice } from '../Slice/collectionSlice'
import { artistSlice } from '../Slice/artistSlice'


import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    collections: collectionSlice.reducer,
    artists: artistSlice.reducer,
    user: userSlice.reducer,
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

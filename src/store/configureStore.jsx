import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer from "./mainSlice";
// import mainSlice from "./mainSlice";

// createApi.jsx - RTK-Query
import { api } from "./createApi";

// наш "персистированный" Store / функция для создания "персистированного" reducer-a
import {
    persistStore, persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage"; // наше хранилище(как localStorage)

const rootReduces = combineReducers({ reducer, [api.reducerPath]: api.reducer })


const persistConfig = {  // делаем persist-config
    key: 'root',
    storage,
}
const persistorReducer = persistReducer(persistConfig, rootReduces)


export const store = configureStore({

    reducer: persistorReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(api.middleware),
})
export const persistor = persistStore(store)
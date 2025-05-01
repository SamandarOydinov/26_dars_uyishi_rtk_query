import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice';
import productsReducer from './services/productsApi';

import { productsApi } from "./services/productsApi";

const store = configureStore({
    reducer: {
        users: userReducer,

        [productsApi.reducerPath]: productsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
});

export default store;

import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import eventReducer from "./eventSlice";
import favoritesSlice from "./favoritesSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        event: eventReducer,
        favorites: favoritesSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

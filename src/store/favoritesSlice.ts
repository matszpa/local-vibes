import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Event} from "../types";

const loadFavoritesFromStorage = (): Event[] => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState: loadFavoritesFromStorage(),
    reducers: {
        addFavorite: (state, action: PayloadAction<Event>) => {
            if (!state.some((event) => event.id === action.payload.id)) {
                state.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state));
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            const updatedState = state.filter((event) => event.id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(updatedState));
            return updatedState;
        },
    },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;

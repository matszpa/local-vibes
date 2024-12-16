import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SearchState {
    searchTerm: string;
    location: string;
    startDate: string;
    endDate: string;
}

const initialState: SearchState = {
    searchTerm: "",
    location: "",
    startDate: "",
    endDate: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchFilters(state, action: PayloadAction<Partial<SearchState>>) {
            return {...state, ...action.payload};
        },
    },
});

export const {setSearchFilters} = searchSlice.actions;
export default searchSlice.reducer;

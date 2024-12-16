import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Event} from "../types";
import {RootState} from "./store";
import {fetchEventsList} from "../api/eventsAPI";


export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, {getState, rejectWithValue}) => {
        const state: RootState = getState() as RootState;
        const {searchTerm, location, startDate, endDate} = state.search;
        const {page} = state.event;
        return fetchEventsList({searchTerm, location, startDate, endDate, page})
    }
);

interface EventState {
    events: Event[],
    loading: boolean,
    page: number,
    error: string | undefined | null,
}

const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
    page: 1
}
const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page += 1;
        },
        resetPage(state) {
            state.page = 1;
        },
        clearEvents(state) {
            state.events = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                if (state.page === 1) {
                    state.events = action.payload
                } else {
                    state.events = [...state.events, ...action.payload];
                }
                state.loading = false;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = "ERROR";
            })
    },
});


export const {incrementPage, resetPage, clearEvents} = eventSlice.actions;
export default eventSlice.reducer;

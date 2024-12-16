import React, {useEffect, useState} from "react";
import {Event} from "../types";
import {useSelector, useDispatch} from "react-redux";
import {RootState, AppDispatch} from "../store/store";
import {setSearchFilters} from "../store/searchSlice";
import {
    clearEvents,
    fetchEvents,
    incrementPage,
    resetPage
} from '../store/eventSlice'
import SearchBar from "../components/SearchBar"
import MapView from "../components/MapView"
import EventList from "../components/EventList";
import {useLocation} from "react-router";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const filters = useSelector((state: RootState) => state.search);
    const events: Event[] = useSelector((state: RootState) => state.event.events);
    const loading = useSelector((state: RootState) => state.event.loading);
    const page = useSelector((state: RootState) => state.event.page);
    const [hover, setHover] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchEvents());
        };
        fetchData();
    }, [dispatch, filters, page]);
    useEffect(() => {
        return () => {
            dispatch(resetPage())
        }
    }, [location]);
    const handleSearch = (newFilters: { searchTerm: string; location: string }) => {
        dispatch(clearEvents());
        dispatch(setSearchFilters(newFilters));
    };
    const handleDateRangeChange = (startDate: string, endDate: string) => {
        dispatch(setSearchFilters({startDate, endDate}));
    };
    const setHoverId = (id: number) => {
        setHover(id);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="m-12">
                <SearchBar onSearch={handleSearch}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div className="bg-white rounded shadow-md h-96 order-1 lg:order-2 z-0">
                    <MapView hoverId={hover} events={events}/>
                </div>

                <div
                    className="bg-white p-4 rounded shadow-md overflow-x-hidden overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-blue-300 [&::-webkit-scrollbar-track]:bg-gray-100 h-[calc(100vh-260px)] order-2 lg:order-1"
                >
                    <EventList
                        onLoadMore={() => {
                            dispatch(incrementPage())
                        }}
                        loading={loading}
                        onHover={setHoverId}
                        events={events} onDateRangeChange={handleDateRangeChange}/>
                </div>
            </div>

        </div>
    );
};

export default Home;

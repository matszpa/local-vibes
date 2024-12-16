import React, {useEffect, useState} from "react";
import {Event} from "../types";
import EventCard from "./EventCard";
import LoadingDots from "./LoadingDots";
import DatePicker from "./DatePicker";

type EventListProps = {
    events: Event[];
    loading: boolean;
    onLoadMore: () => void;
    onDateRangeChange: (from: string, to: string) => void;
    onHover: (id: number) => void;
};


const EventList = ({events, loading, onLoadMore, onDateRangeChange, onHover}: EventListProps) => {
    const [date, setDate] = useState({
        from: "",
        to: ""
    })

    useEffect(() => {
        handleDateChange();
    }, [date]);

    const handleDateChange = () => {
        onDateRangeChange(date.from, date.to);
    };
    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate({...date, [event.target.name]: event.target.value});
    }
    return (
        <div>
            <h4 className="text-xl font-semibold mb-4">Events</h4>
            <DatePicker dateValue={date} onChange={onDateChange}/>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} onHover={onHover} event={event}/>
                ))}
            </ul>
            {!loading && (
                <div className="text-center mt-4">
                    <button
                        onClick={onLoadMore}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >Load more
                    </button>
                </div>
            )}
            {loading && <LoadingDots/>}
        </div>
    );
};

export default EventList;
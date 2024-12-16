import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import EventCard from "../components/EventCard";

const FavoritesPage: React.FC = () => {
    const favoriteEvents = useSelector((state: RootState) => state.favorites);

    return (
        <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorite Events</h1>
            {favoriteEvents.length === 0 ? (
                <p className="text-gray-500">You have no favorite events yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteEvents.map((event) => (
                        <EventCard key={event.id} event={event} onHover={() => {
                        }}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;

import React from "react";
import {Event} from "../types";
import {Link} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {addFavorite, removeFavorite} from "../store/favoritesSlice";

interface EventCardProps {
    event: Event,
    onHover: (id: number) => void;
}

const EventCard: React.FC<EventCardProps> = ({event, onHover}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites);

    const isFavorite = favorites.some((fav) => fav.id === event.id);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            dispatch(removeFavorite(event.id));
        } else {
            dispatch(addFavorite(event));
        }
    };
    return (
        <div key={event.id}
             onMouseOver={() => onHover(event.id)}
             onMouseLeave={() => onHover?.(0)}
             className="bg-white rounded-lg shadow-lg overflow-hidden hover:drop-shadow-2xl transition-shadow flex flex-col">
            <Link to={`/events/${event.id}`} className="block">
                <div className="aspect-w-2 aspect-h-1 h-32">
                    <img
                        src={event.image}
                        alt={event.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col space-y-2">
                <a href={event.url} target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 line-clamp-2">
                        {event.name}
                    </h3>
                </a>

                <p className="text-sm text-gray-600">
                    <span className="font-medium">{event.date}</span> • {event.time}
                </p>

                <p className="text-sm text-gray-600 truncate">{event.address}</p>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={handleFavoriteToggle}
                    className={`text-md mt-2 px-4 py-1 rounded ${
                        isFavorite ? "bg-red-400 text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <Link to={`/events/${event.id}`} className="block text-blue-400">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default EventCard;

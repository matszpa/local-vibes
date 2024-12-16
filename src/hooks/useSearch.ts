import {useState} from "react";
import axios from "axios";

interface Place {
    place_id: number;
    display_name?: string;
    name: string;
    lat: number;
    lon: number;
}

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [locationTerm, setLocationTerm] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Place[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

    const handleSearchLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocationTerm(value);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        if (value.length > 2) {
            setSearchTimeout(
                setTimeout(async () => {
                    try {
                        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
                            params: {
                                q: value,
                                format: "json",
                                limit: 8,
                            },
                        });
                        setSuggestions(response.data);
                    } catch (error) {
                        console.error("Error fetching location data:", error);
                    }
                }, 500)
            );
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (place: Place) => {
        setLocation(`${place.lat},${place.lon}`);
        setLocationTerm(place.name);
        setSuggestions([]);
    };

    return {
        searchTerm,
        locationTerm,
        suggestions,
        location,
        setSearchTerm,
        handleSearchLocation,
        handleSelect,
    };
};

import React, {FormEvent} from "react";
import {useSearch} from "../hooks/useSearch";

interface SearchBarProps {
    onSearch: (filters: { searchTerm: string; location: string }) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => {
    const {
        searchTerm,
        locationTerm,
        suggestions,
        location,
        setSearchTerm,
        handleSearchLocation,
        handleSelect,
    } = useSearch();

    const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        onSearch({searchTerm, location});
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center bg-white rounded-full shadow-md p-2"
        >
            <div className="flex-1 border-gray-300 border-r sm:border-r pr-0 sm:pr-4 w-full sm:w-auto">
                <input
                    type="text"
                    className="w-full focus:outline-none text-gray-700 pl-2"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="relative flex-1 w-full sm:w-auto">
                <input
                    type="text"
                    className="w-full focus:outline-none text-gray-700 px-2"
                    placeholder="Choose a location"
                    value={locationTerm}
                    onChange={handleSearchLocation}
                />
                {suggestions.length > 0 && (
                    <ul className="absolute top-full mt-1 bg-white border rounded shadow-lg w-full z-20">
                        {suggestions.map((place) => (
                            <li
                                key={place.place_id}
                                onClick={() => handleSelect(place)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            >
                                {place.display_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                type="submit"
                className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-600 text-white rounded-full px-4 py-2"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;

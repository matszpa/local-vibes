import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import {EventDetails} from "../types";
import {fetchEventDetails} from "../api/eventsAPI";
import ImageGallery from "../components/ImageGallery";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import LoadingDots from "../components/LoadingDots";


const EventDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(true);
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventData = await fetchEventDetails(id);
                setEvent(eventData);
                setLoading(false);
            } catch (error) {
                console.error("Error", error);
            }
        };
        getEvents();
    }, [id]);
    if (loading) return <LoadingDots/>;
    if (!event) return <p>Not found.</p>;

    const venue = event._embedded?.venues[0];
    const attraction = event._embedded?.attractions?.[0]?.name || "Unknown Artist";
    const genre = event.classifications?.[0]?.genre.name || "Unknown Genre";
    const date = event.dates.start.localDate;
    const time = event.dates.start.localTime;
    const price = event.priceRanges?.[0];

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ImageGallery images={event.images}/>
                <div className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">{event.name}</h1>
                    <p className="text-gray-600">
                        <span className="font-semibold">Artist:</span> {attraction}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Genre:</span> {genre}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Date:</span> {date}{" "}
                        <span className="font-semibold">Time:</span> {time}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Venue:</span> {venue?.name}, {venue?.address.line1},{" "}
                        {venue?.city.name}, {venue?.state.name}, {venue?.country.name} - {venue?.postalCode}
                    </p>
                    {price && (
                        <p className="text-gray-600">
                            <span className="font-semibold">Price Range:</span> {price.min} {price.currency} -{" "}
                            {price.max} {price.currency}
                        </p>
                    )}
                    {event.pleaseNote && (
                        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
                            <p>
                                <span className="font-semibold">Note:</span> {event.pleaseNote}
                            </p>
                        </div>
                    )}
                    <MapContainer
                        className="h-40 lg:h-96 w-full"
                        center={[venue?.location.latitude, venue?.location.longitude]}
                        zoom={13}
                    >
                        <Marker position={[venue?.location.latitude, venue?.location.longitude]}></Marker>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                    </MapContainer>
                </div>


                <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                    <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Buy Tickets
                    </a>
                    <p className="text-gray-500">
                        <span className="font-semibold">Time Zone:</span> {event.dates.timezone}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
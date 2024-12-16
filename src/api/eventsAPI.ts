import axios from "axios";
import {Event, EventDetails} from "../types";

type FetchEventsParams = {
    searchTerm?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    page:number
}

export const fetchEventsList = async (params: FetchEventsParams): Promise<Event[]> => {
    try {
        const response = await axios.get(
            "https://app.ticketmaster.com/discovery/v2/events",
            {
                params: {
                    apikey: process.env.REACT_APP_TICKETMASTER_API_KEY,
                    keyword: params.searchTerm || undefined,
                    latlong: params.location || undefined,
                    startDateTime: params.startDate ? `${params.startDate}T00:00:00Z` : undefined,
                    endDateTime: params.endDate ? `${params.endDate}T23:59:59Z` : undefined,
                    size: 4,
                    radius: 50,
                    page: params.page
                },
            }
        );

        const eventsData = response.data._embedded.events.map((event: any) => ({
            id: event.id,
            name: event.name,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            description: event.info || "No description available.",
            image: event.images[0]?.url || "",
            url: event.url,
            location: {
                lat: parseFloat(event._embedded.venues[0].location.latitude),
                lng: parseFloat(event._embedded.venues[0].location.longitude),
            },
            address: `${event._embedded.venues[0].address.line1}, ${event._embedded.venues[0].city.name}`,
        }));
        return eventsData.length > 0 ? eventsData : [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

export const fetchEventDetails = async (id: string | undefined): Promise<EventDetails | null> => {
    try {
        const response = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events/${id}`,
            {
                params: {
                    apikey: process.env.REACT_APP_TICKETMASTER_API_KEY,
                },
            }
        );

        const eventDetails: EventDetails = response.data;
        return eventDetails;
    } catch (error) {
        console.error("Error fetching events:", error);
        return null;
    }
};

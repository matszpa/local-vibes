export type Event = {
    id: number;
    name: string;
    date: string;
    time: string;
    url: string;
    description: string;
    image?: string;
    location: {
        lat: number;
        lng: number;
    };
    address: string;
};

export type EventDetails = {
    name: string;
    id: string;
    url: string;
    images: { url: string; ratio: string }[];
    classifications: {
        genre: { name: string };
        subGenre: { name: string };
        segment: { name: string };
    }[];
    dates: {
        start: { localDate: string; localTime: string };
        timezone: string;
    };
    _embedded: {
        venues: {
            name: string;
            address: { line1: string };
            city: { name: string };
            state: { name: string };
            country: { name: string };
            postalCode: string;
            location: { longitude: number, latitude: number };
        }[];
        attractions: { name: string }[];
    };
    priceRanges?: { min: number; max: number; currency: string }[];
    pleaseNote?: string;
}
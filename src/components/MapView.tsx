import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import L from "leaflet";
import {Event} from "../types";

interface MapViewProps {
    events: Event[];
    hoverId: number | null;
}

const MapView = ({events, hoverId}: MapViewProps) => {
    const defaultZoom = 15;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });


    const customIcon = (highlight: boolean) => {
        return new L.Icon({
            iconSize: [25, 41],
            iconUrl: highlight
                ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
                : require("leaflet/dist/images/marker-icon.png"),
        });
    };

    //helper component
    const SetBounds: React.FC<{ bounds: [number, number][] }> = ({bounds}) => {
        const map = useMap();

        useEffect(() => {
            if (bounds.length > 0) {
                map.fitBounds(bounds, {padding: [50, 50]});
            }

        }, [bounds, map]);

        return null;
    };

    const eventBounds: [number, number][] = events.map((event) => [
        event.location.lat,
        event.location.lng,
    ]);

    return (
        <MapContainer
            className="h-96 w-full"
            center={[0, 0]}
            zoom={13}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <SetBounds bounds={eventBounds}/>
            <MarkerClusterGroup>
                {events.map((event) => (
                    <Marker
                        key={event.id}
                        position={event.location}
                        icon={customIcon(event.id === hoverId)}
                    >
                        <Popup>
                            <div>
                                <h3 className="font-bold">{event.name}</h3>
                                <p>Date: {event.date}</p>
                                <img
                                    src={event.image}
                                    className="max-h-24 mx-auto block"
                                    alt="Event"
                                />
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default MapView;

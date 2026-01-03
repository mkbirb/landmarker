"use client"

import { useMapEvents } from "react-leaflet";

interface MapClickHandlerProps {
    onCreatePin: (latitude: number, longitude: number) => void;
}

function MapClickHandler({onCreatePin}: MapClickHandlerProps) {
    // Hook to catch the Click Event
    useMapEvents(
        {
            click: (e) => {
                const {lat, lng} = e.latlng;
                onCreatePin(lat, lng);
            }
        },
    );
    console.log("MapClickHandler rendered");

    return null;
}

export default MapClickHandler;
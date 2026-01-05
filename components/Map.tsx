"use client"

import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { LayerGroup, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapClickHandler from "./MapClickHandler";

interface MapProps {
    pins: any[];
    onMapClick: (lat: number, lng: number) => void;
}

const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({pins, onMapClick}: MapProps) {
    // Default Starting Center
    const center: [number, number] = [37.7749, -122.4194];


    return (
        <div className="h-125 w-full border-2 rounded-2xl overflow-hidden">
            <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
                {/* Fetch the Image Tiles of the Earth */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onCreatePin={onMapClick} />
                <LayerGroup key={pins.length}>
                    {pins.map((pin) => (
                        <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
                            {/* Displays a Popup when User clicks the Landmarker */}
                            <Popup>
                                <p> {pin.name} </p>
                                <p> {pin.description} </p>
                            </Popup>
                        </Marker>
                    ))}
                </LayerGroup>
            </MapContainer>
        </div>
    )
}
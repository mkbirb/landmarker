import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
    pins: any[];
}

export default function Map({pins}: MapProps) {
    // Default Starting Center
    const center: [number, number] = [37.7749, -122.4194];

    return (
        <div className="h-125 w-full border-2 rounded-2xl overflow-hidden">
            <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
                {/* Fetch the Image Tiles of the Earth */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {pins.map((pin) => (
                    <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
                        {/* Displays a Popup when User clicks the Landmarker */}
                        <Popup>
                            <p> {pin.name} </p>
                            <p> {pin.description} </p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
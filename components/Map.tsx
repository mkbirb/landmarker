import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Modal from "react-modal";
import MapClickHandler from "./MapClickHandler";
import { createPin } from "@/actions/createPin";

interface MapProps {
    pins: any[];
}

export default function Map({pins}: MapProps) {
    // Default Starting Center
    const center: [number, number] = [37.7749, -122.4194];

    // NEED TO FIX THIS LATER WITH AUTH
    const userId = "46e8fb6f-fe66-49c4-b575-c5bc64ce4c99"; 

    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState<{lat:Number, lng: Number} | null>(null);

    const handleMapClick = (lat:number, lng:number) => {
        setCoords({lat, lng});
        setIsOpen(true);
    }

    const handleSavePin = async (formData: FormData) => {
        if(!coords) return;
        formData.append("latitude", coords.lat.toString());
        formData.append("longitude", coords.lng.toString());

        try {
            await createPin(formData);
            setIsOpen(false);
        }
        catch (error) {
            console.error("Failed to create pin:", error);
        }
    }


    return (
        <div className="h-125 w-full border-2 rounded-2xl overflow-hidden">
            <MapContainer center={center} zoom={12} scrollWheelZoom={true} className="h-full w-full">
                {/* Fetch the Image Tiles of the Earth */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler onCreatePin={handleMapClick} />
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
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                overlayClassName="fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center"
                className="bg-white p-6 rounded-lg outline-none"
            >
                <h2 className="text-xl font-bold mb-4">Create a New Landmarker</h2>
                <form action={handleSavePin}>
                    <div className="space-y-2">
                        <input name="name" placeholder="Title" className="w-full border p-2 rounded" required />
                        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
                        <select name="categoryId" className="w-full border p-2 rounded" required>
                            <option value="">Select Category</option>
                            <option value="1">🌲Nature</option>
                            <option value="2">🏛️Historical</option>
                            <option value="3">🎭Cultural</option>
                        </select>
                        <input type="hidden" name="userId" value={`${userId}`} />
                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Attach Media
                        </label>
                        <input 
                            type="file" 
                            name="media" 
                            accept="image/*" 
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded"> Cancel </button>
                            <button type="submit" className="px-4 py-2 bg-green-200 rounded"> Save </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
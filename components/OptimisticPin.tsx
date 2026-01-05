"use client"

import { createPin } from "@/actions/createPin"
import { startTransition, useOptimistic, useState, useTransition } from "react"
import CreatePinModal from "./CreatePinModal";
import dynamic from "next/dynamic";

interface OptimisticPin {
    id: number | string; 
    name: string;
    description?: string | null;
    latitude: number;
    longitude: number;
    categoryId: number;
    userId: string;
    createdAt?: Date |null;
    media?: any[];
    reviews?: any[];
}

interface OptimisticPinProps {
    initialPins: OptimisticPin[];
    userId: string;
}

// Load the Map Component only when it is needed
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
});

// Creates a Fake Pin that would immediately appear when the user creates a Pin, rather than waiting for database
export default function OptimisticPin ({initialPins, userId}: OptimisticPinProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleMapClick = (lat: number, lng: number) => {
        setCoords({ lat, lng });
        setIsOpen(true);
    };

    const [optimisticPins, addOptimisticPin] = useOptimistic<OptimisticPin[], OptimisticPin>(
        initialPins,
        (state, newPin) => [...state, newPin]
    )

    // The Temporary Pin that immediately appears
    const handleAddPin = async (formData: FormData) => {
        if (!coords) return;

        formData.append("latitude", coords.lat.toString());
        formData.append("longitude", coords.lng.toString());

        const tempPin = {
            id: Math.random(),
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            latitude: coords.lat,
            longitude: coords.lng,
            categoryId: Number(formData.get("categoryId")),
            userId: userId,
            media: [], 
            reviews: [],
            createdAt: new Date(),
        }
        
        startTransition(async () => {
            addOptimisticPin(tempPin);
            setIsOpen(false);

            try {
                await createPin(formData);
            }
            catch(error) {
                setIsOpen(true);
                console.error("Failed to create pin:", error);
            }  
        })
    }


    return (
        <>
            <Map pins={optimisticPins} onMapClick={handleMapClick} />
            <CreatePinModal isOpen={isOpen} setIsOpen={setIsOpen} userId={userId} onSubmit={handleAddPin}/>
        </>
    )
}
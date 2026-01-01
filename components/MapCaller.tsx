"use client";

import dynamic from "next/dynamic";

// Load the Map Component only when it is needed
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <p>Loading Map...</p>,
});

export default function MapCaller({ pins }: { pins: any[] }) {
    return <Map pins={pins} />;
}
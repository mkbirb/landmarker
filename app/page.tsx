import Map from "@/components/Map";
import MapCaller from "@/components/MapCaller";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import Image from "next/image";

export default async function Home() {
  // Fetch Pins from Database and display them on Map
  const pins = await prisma.pin.findMany();

  return (
    <main className="p-8">
      <MapCaller pins={pins} />
    </main>
  );
}

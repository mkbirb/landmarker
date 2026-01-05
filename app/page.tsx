import Map from "@/components/Map";
import OptimisticPin from "@/components/OptimisticPin";
import prisma from "@/lib/prisma";
import dynamic from "next/dynamic";
import Image from "next/image";

export default async function Home() {
  // Fetch Pins from Database and display them on Map
  const pins = await prisma.pin.findMany();

  // NEED TO FIX THIS LATER WITH AUTH
  const userId = "46e8fb6f-fe66-49c4-b575-c5bc64ce4c99"; 

  return (
    <main className="p-8">
      <OptimisticPin initialPins={pins} userId={userId} />
    </main>
  );
}

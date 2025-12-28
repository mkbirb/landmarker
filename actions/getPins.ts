// Retrieve all pins from the Supabase Database

"use server"

import { Pin } from "@prisma/client";
import Prisma from "@/lib/prisma"

// Even when it fails, array of Pins is returned
export async function getPins(): Promise<Pin[]> {
    try {
        const pins = await Prisma.pin.findMany({
            include: {
                category: true,
                media: true,
                reviews: true,
            }
        });

        return pins;
    }
    catch (error) {
        console.error("Failed to fetch pins:", error);
        return [];
    }
}
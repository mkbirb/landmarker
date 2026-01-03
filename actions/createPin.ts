"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function createPin(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const latitude = Number(formData.get('latitude'));
    const longitude = Number(formData.get('longitude'));
    const categoryId = Number(formData.get('categoryId'));
    const media = formData.get("media") as File;
    let mediaUrl = null;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Upload to the Supabase Storage
    if (media && media.size > 0) {
        const fileType = media.type.split(".").pop();
        // Generate a Unique File Name
        const fileName = `${Math.random()}-${Date.now()}.${fileType}`;
        // Storage Section in Supabase
        const filePath = `pin-photos/${fileName}`;

        const {data, error} = await supabase.storage.from("pin-media").upload(filePath, media);

        if (error) throw new Error("Upload failed: " + error.message);

        // Allows the displaying of the Media
        const { data: urlData } = supabase.storage.from("pin-media").getPublicUrl(filePath);
        
        mediaUrl = urlData.publicUrl;

        // Tells Next.js to get the new data
        revalidatePath("/");
    }
    
    
    await prisma.pin.create({
        data: {
            name,
            description,
            latitude,
            longitude,
            // Link the Foreign Key to Category
            category: {
                connect: {id: categoryId}
            },
            user: {
                connect: {id: formData.get('userId') as string}
            },
            media: mediaUrl ? {
                create: { url: mediaUrl }
                } : undefined
            }
    });
}
import prisma from "@/lib/prisma";

export async function createPin(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const latitude = Number(formData.get('latitude'));
    const longitude = Number(formData.get('longitude'));
    const categoryId = Number(formData.get('categoryId'));
    const mediaUrl = formData.get('mediaUrl') as string | null;
    
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
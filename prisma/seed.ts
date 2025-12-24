import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // Provide a Clean Slate, where the order matters
    await prisma.review.deleteMany()
    await prisma.media.deleteMany()
    await prisma.pin.deleteMany()
    await prisma.category.deleteMany()

    // Create Test User
    const user = await prisma.user.upsert({
        where: {email: 'test@example.com'},
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Test Explorer',
        },
    })

    // Create the Categories
    const park = await prisma.category.create({
        data: { name: 'Park', icon: 'tree' },
    })
    const cafe = await prisma.category.create({
        data: { name: 'Cafe', icon: 'coffee' },
    })

    await prisma.pin.create({
        data: {
        name: 'Central Park',
        description: 'A great place for a walk.',
        latitude: 40.7850,
        longitude: -73.9682,
        userId: user.id,
        categoryId: park.id,
        },
    })

    console.log('Seed data created successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
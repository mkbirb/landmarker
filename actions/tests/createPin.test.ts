import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import prisma from '@/lib/prisma';
import { createPin } from '../createPin';

describe('createPin Server Action', () => {
    // Create Test Category and Test user
    let testUserId: {id: string};
    let testCategoryId: {id: number};

    beforeAll(async () => {
        await prisma.$connect();

        testCategoryId =  await prisma.category.upsert({
            where: { name: 'Test Category' },
            create: { name: 'Test Category', icon: 'test-icon' },
            update: { name: 'Test Category', icon: 'test-icon' },
        });

        testUserId = await prisma.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: { 
                email: 'test@example.com',
                name: 'Test User'
            },
        });
    });

    // Cleanup of deleting created test data
    afterAll(async () => {
        await prisma.pin.deleteMany({
            where: {name: 'Test Pin'}
        });
    });

    it('should create a new pin in the database', async () => {
        // Create Fake FormData First
        const formData = new FormData();
        formData.append('name', 'Test Pin');
        formData.append('description', 'This is a test pin');
        formData.append('latitude', '37.7749');
        formData.append('longitude', '-122.4194');
        formData.append('userId', testUserId.id.toString());
        formData.append('categoryId', testCategoryId.id.toString());

        // Call the action
        await createPin(formData);

        const savedPin = await prisma.pin.findFirst({
            orderBy: { createdAt: 'desc' },
            where: {name: 'Test Pin'}
        });

        expect(savedPin).toBeDefined();
        expect(savedPin?.name).toBe('Test Pin');
        expect(savedPin?.description).toBe('This is a test pin');
        expect(savedPin?.latitude).toBe(37.7749);
        expect(savedPin?.longitude).toBe(-122.4194);
        expect(savedPin?.createdAt).toBeInstanceOf(Date);
    });
});
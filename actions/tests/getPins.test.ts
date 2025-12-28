import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPins } from '../getPins';
import { Pin } from '@prisma/client';
import prisma from '@/lib/prisma'


describe('getPins Server Action', () => {
    beforeEach(async () => {
        await prisma.$connect();
    });

    it('should return an array of pins', async () => {
        const pins: Pin[] = await getPins();
        
        // Assertion
        expect(Array.isArray(pins)).toBe(true);

        if (pins && pins.length > 0) {
            const firstPin = pins[0];

            expect(firstPin).toHaveProperty('category');
            
            expect(firstPin.categoryId).not.toBeNull();

            expect(typeof firstPin.latitude).toBe('number');

        }
    });

});
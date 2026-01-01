import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from '@prisma/adapter-neon';


const prismaClientSingleton = () => {
    const connectionString = `${process.env.DATABASE_URL}`;

    const adapter = new PrismaNeon({ connectionString });
    const prisma = new PrismaClient({ adapter });

    return prisma;
}

// Store the Prisma Global Object for Typescript to prevent Typescript error that prismaGlobal
// Does not exist
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Singleton, checks and reuse connection if already exists
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

// Used just for Development Mode to prevent Nextjs rerunning and creating new Connection
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
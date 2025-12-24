import { PrismaClient } from "@prisma/client/extension";

const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Store the Prisma Global Object for Typescript to prevent Typescript error that prismaGlobal
// Does not exist
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Singleton, checks and reuse connection if already exists
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// Used just for Development Mode to prevent Nextjs rerunning and creating new Connection
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
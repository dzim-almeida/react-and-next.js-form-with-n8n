import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;
const dbSchema = process.env.DB_SCHEMA ?? 'app';

if (!connectionString) {
	throw new Error("DATABASE_URL não definida");
}

const adapter = new PrismaPg({ connectionString }, { schema: dbSchema });

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
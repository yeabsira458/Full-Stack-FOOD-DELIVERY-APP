import { PrismaClient } from "@/generated/prisma";
import prismaConfig from "../../prisma.config";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

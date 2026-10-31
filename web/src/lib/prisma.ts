import { PrismaClient } from "@prisma/client";

function createPrismaClient() {
  const client = new PrismaClient({ log: [{ emit: "event", level: "query" }] });
  client.$on("query", (event) => {
    console.log(JSON.stringify({ event: "db.query", durationMs: event.duration }));
  });
  return client;
}

const globalForPrisma = globalThis as unknown as { prisma?: ReturnType<typeof createPrismaClient> };
export const prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

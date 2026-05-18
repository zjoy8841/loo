import { PrismaClient } from "@prisma/client";

// Hot-reload 시 PrismaClient 다중 인스턴스화를 막기 위한 전역 캐시 패턴.
// 개발 환경에서만 globalThis에 캐싱하고, 프로덕션은 매 import마다 새 인스턴스(런타임 1회).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

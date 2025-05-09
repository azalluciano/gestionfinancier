import { PrismaClient } from "@prisma/client";

// Déclaration pour le type global
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Éviter les instances multiples en développement
export const prisma = globalThis.prisma || new PrismaClient();

// Sauvegarder l'instance dans la variable globale en développement
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

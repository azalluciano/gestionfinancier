import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log("✅ Connexion réussie - users:", users);
  } catch (error) {
    console.error("❌ Échec de la connexion Prisma:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

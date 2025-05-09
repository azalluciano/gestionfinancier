import type { NextConfig } from "next";
import { execSync } from "child_process";

// Essayer de générer le client Prisma avant la construction
try {
  console.log("Generating Prisma client...");
  execSync("npx prisma generate");
  console.log("Prisma client generated successfully!");
} catch (error) {
  console.error("Error generating Prisma client:", error);
}

const nextConfig: NextConfig = {
  /* vos configurations actuelles */
};

export default nextConfig;

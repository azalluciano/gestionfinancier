"use server";

import { prisma } from "@/lib/prisma";
import "dotenv/config";

export async function checkAndAddUser(email: string | undefined) {
  if (!email) return;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
        },
      });
      console.log("User added:", email);
    } else {
      console.log("User already exists:", email);
    }
  } catch (error) {
    console.error("Error checking and adding user:", error);
  }
}

export async function addBudgets(
  email: string,
  name: string,
  amount: number,
  selectedEmoji: string
) {
  if (!email) return;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      console.error("User not found:", email);
      return;
    }

    const budget = await prisma.budget.create({
      data: {
        name,
        amount,
        emoji: selectedEmoji,
        userId: user.id,
      },
    });
    console.log("Budget added:", budget);
  } catch (error) {
    console.error("Error adding budget:", error);
    throw error;
  }
}

export async function getBudgetsByUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    return user.budgets;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
}

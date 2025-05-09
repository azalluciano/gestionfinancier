"use server";

import { prisma } from "@/lib/prisma";
import { transcode } from "buffer";
import "dotenv/config";
import { connect } from "http2";

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

export async function getTransactionsByBudgetId(budgetId: string) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    });
    if (!budget) {
      throw new Error("Budget not found");
    }
    return budget;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function addTransactionToBudget(
  budgetId: string,
  amount: number,
  description: string
) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    });
    if (!budget) {
      throw new Error("Budget not found");
    }

    const totalTransactions = budget.transactions.reduce(
      (sum: number, transaction: { amount: number }) => {
        return sum + transaction.amount;
      },
      0
    );

    const totalWithNewTransaction = totalTransactions + amount;
    if (totalWithNewTransaction > budget.amount) {
      throw new Error("Transaction amount exceeds budget limit");
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        emoji: budget.emoji,
        budget: {
          connect: {
            id: budget.id,
          },
        },
      },
    });
    console.log("Transaction added:", newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}
export async function deleteTransaction(transactionId: string) {
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    console.log("Transaction deleted:", transaction);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

export async function deleteBudget(budgetId: string) {
  try {
    await prisma.transaction.deleteMany({
      where: {
        budgetId,
      },
    });
    await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });
    console.log("Budget deleted:", budgetId);
  } catch (error) {
    console.error("Error deleting budget:", error);
    throw error;
  }
}

export async function deleteTransactionById(transactionId: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
    console.log("Transaction deleted:", transaction);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

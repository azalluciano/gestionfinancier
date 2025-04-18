"use client";
import { Budget } from "@/type";
import React, { FC } from "react";

interface BudgetItemProps {
  budget: Budget;
}

const BudgetItem: FC<BudgetItemProps> = ({ budget }) => {
  const transactionCount = budget.transactions ? budget.transactions.length : 0;
  const totalTrasanctionAmount = budget.transactions
    ? budget.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      )
    : 0;

  return <div>BudgetItem</div>;
};

export default BudgetItem;

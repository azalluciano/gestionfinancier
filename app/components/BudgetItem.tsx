"use client";

import { Budget } from "@/type";
import React, { FC } from "react";
import { Wallet, TrendingUp, Calendar } from "lucide-react";

interface BudgetItemProps {
  budget: Budget;
  enableHover?: number;
}

const BudgetItem: FC<BudgetItemProps> = ({ budget, enableHover = 1 }) => {
  const transactionCount = budget.transactions ? budget.transactions.length : 0;
  const totalTransactionAmount = budget.transactions
    ? budget.transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
    : 0;
  const remainingAmount = budget.amount - totalTransactionAmount;
  const percentageUsed = Math.min(Math.round((totalTransactionAmount / budget.amount) * 100), 100);

  // Classes conditionnelles pour le survol
  const hoverClasses = enableHover === 1 ? "hover:shadow-xl hover:border-indigo-500 hover:scale-[1.02]" : "";

  // Dynamically set progress bar color based on percentage used
  const getProgressColor = () => {
    if (percentageUsed < 50) return "bg-emerald-500";
    if (percentageUsed < 75) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <li className={`p-5 rounded-2xl border border-gray-100 list-none shadow-md bg-white transition-all duration-300 relative overflow-hidden ${hoverClasses}`}>
      {/* Top section with name and amount */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-indigo-100 text-2xl h-12 w-12 rounded-xl flex justify-center items-center shadow-sm">
            {budget.emoji}
          </div>
          <div className="flex flex-col ml-4">
            <span className="font-bold text-xl text-gray-800">{budget.name}</span>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar size={14} className="mr-1" />
              <span>{transactionCount} transaction{transactionCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        <div className="text-xl font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
          {budget.amount.toLocaleString()} Ar
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
        <div
          className={`h-3 rounded-full ${getProgressColor()}`}
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>

      {/* Stats section */}
      <div className="flex justify-between items-center mt-4 text-sm font-medium">
        <div className="flex items-center text-gray-600">
          <TrendingUp size={16} className="mr-2 text-rose-500" />
          <span>{totalTransactionAmount.toLocaleString()} Ar dépensés</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Wallet size={16} className="mr-2 text-emerald-500" />
          <span>{remainingAmount.toLocaleString()} Ar restants</span>
        </div>
      </div>

      {/* Percentage indicator */}
      <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
        {percentageUsed}%
      </div>
    </li>
  );
};

export default BudgetItem;
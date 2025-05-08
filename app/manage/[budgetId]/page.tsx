"use client";
import {
  addTransactionToBudget,
  deleteBudget,
  deleteTransactionById,
  getTransactionsByBudgetId,
} from "@/app/action";
import BudgetItem from "@/app/components/BudgetItem";
import Wrapper from "@/app/components/Wrapper";
import { Budget } from "@/type";
import { Send, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const [budgetId, setBudgetId] = useState<string>("");
  const [budget, setBudget] = useState<Budget>();
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  async function fetchBudgetData(budgetId: string) {
    try {
      if (budgetId) {
        const budgetData = await getTransactionsByBudgetId(budgetId);
        setBudget(budgetData);
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    }
  }

  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setBudgetId(resolvedParams.budgetId);
      fetchBudgetData(resolvedParams.budgetId);
    };
    getId();
  }, [params]);

  const handleAddTransaction = async () => {
    if (!amount || !description) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    try {
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        toast.error("Montant invalide");
        return;
      }
      const newTransaction = await addTransactionToBudget(
        budgetId,
        amountNumber,
        description
      );
      toast.success("Transaction ajoutée avec succès");
      fetchBudgetData(budgetId); // Refresh budget data after adding transaction
      setDescription("");
      setAmount("");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Vous avez dépassé le montant de votre budget");
    }
  };
  function formatAmount(amount: number): string {
    return new Intl.NumberFormat("fr-FR").format(amount);
  }

  const handleDeleteBudget = async () => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce budget ? Cette action est irréversible."
    );
    if (confirmed) {
      try {
        await deleteBudget(budgetId);
      } catch (error) {
        console.error("Error deleting budget:", error);
      }
      toast.success("Budget supprimé avec succès");
      redirect("/budgets");
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette transaction ? Cette action est irréversible."
    );
    if (confirmed) {
      try {
        await deleteTransactionById(transactionId);
        toast.success("Transaction supprimée avec succès");
        fetchBudgetData(budgetId); // Refresh budget data after deleting transaction
      } catch (error) {
        console.error("Error deleting transaction:", error);
        toast.error("Erreur lors de la suppression de la transaction");
      }
    }
  };

  return (
    <Wrapper>
      {budget && (
        <div className="flex md:flex-row flex-col">
          <div className="md:w-1/3">
            <BudgetItem budget={budget} enableHover={0} />
            <button
              className="btn btn-secondary mt-4"
              onClick={handleDeleteBudget}
            >
              Supprimer le budget
            </button>
            <div className="space-y-4 flex flex-col mt-4 ">
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
                className="input input-bordered w-full"
              />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Montant"
                required
                className="input input-bordered w-full"
              />
              <button
                className="btn btn-primary text-white"
                onClick={handleAddTransaction}
              >
                Ajouter votre dépense
              </button>
            </div>
          </div>
          {budget?.transactions && budget.transactions.length > 0 ? (
            <div className="overflow-x-auto md:mt-0 mt-4 md:w-2/3 ml-4">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Montant</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {budget?.transactions?.map((transaction, index) => (
                    <tr key={index}>
                      <td className="text-lg md:text-3xl">
                        {transaction.emoji}
                      </td>
                      <td>
                        <div className="badge badge-accent badge-xs md:badge-sm text-white">
                          -{formatAmount(transaction.amount)} Ar
                        </div>
                      </td>
                      <td>{transaction.description}</td>
                      <td>
                        {transaction.createdAt.toLocaleDateString("fr-FR")}
                      </td>
                      <td>
                        {transaction.createdAt.toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm"
                          onClick={() =>
                            handleDeleteTransaction(transaction.id)
                          }
                        >
                          <Trash className="w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="md:w-2/3 mt-10 md:ml-4 flex items-center justify-center">
              <Send strokeWidth={1.5} className="w-8 h-8 text-accent" />
              <span className="text-gray-500 ml-2">Aucune transaction</span>
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Page;

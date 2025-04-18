"use client";
import React, { use, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { addBudgets } from "../action";
import { toast } from "react-toastify";

const Page = () => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const handleEmojiSelected = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };
  const handleAddBudget = async () => {
    try {
      const amount = parseFloat(budgetAmount);
      console.log("ss");

      if (isNaN(amount) || amount <= 0) {
        toast.error("Veuillez entrer un montant valide.");
        return;
      }
      await addBudgets(
        user?.primaryEmailAddress?.emailAddress || "",
        budgetName,
        amount,
        selectedEmoji
      );
    } catch (error) {
      toast.error("Erreur lors de l'ajout du budget.");
    }
  };
  return (
    <Wrapper>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        Nouveau Budget
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Création d&apos;un budget</h3>
          <p className="py-4">Permet de controler ces depenses facilement</p>
          <div className="w-full flex flex-col">
            <input
              type="text"
              value={budgetName}
              placeholder="Nom du budget"
              onChange={(e) => setBudgetName(e.target.value)}
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="number"
              value={budgetAmount}
              placeholder="Montant du budget"
              onChange={(e) => setBudgetAmount(e.target.value)}
              className="input input-bordered w-full mb-3"
              required
            />
            <button
              className="btn  mb-3"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {selectedEmoji || "sélectionnez un emoji"}
            </button>
            {showEmojiPicker && (
              <div className="flex justify-center items-center my-4">
                <EmojiPicker onEmojiClick={handleEmojiSelected} />
              </div>
            )}

            <button onClick={handleAddBudget} className="btn btn-primary">
              Ajouter budget
            </button>
          </div>
        </div>
      </dialog>
    </Wrapper>
  );
};

export default Page;

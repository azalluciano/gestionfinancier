"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Image from "next/image";
import BudgetItem from "./components/BudgetItem";
import budgets from "./data";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-300">
      <NavBar />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex items-center justify-center flex-col w-full">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center uppercase text-base-content">
              Prenez le <span className="text-primary">contrôle</span>
              <br className="hidden sm:block" /> de vos finances
            </h1>

            <div className="mt-8 bg-base-200 bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-xl">
              <p className="text-lg md:text-xl text-base-content text-center">
                Suivez vos budgets et vos dépenses en toute simplicité.
                <br className="hidden md:block" />
                Notre application vous permet de gérer vos finances personnelles
                de manière efficace et intuitive.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/sign-in"
                className="w-full sm:w-auto px-8 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-content transition-colors duration-300"
              >
                Se connecter
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-content font-medium rounded-lg hover:bg-primary-focus transition-colors duration-300"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>

          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
            <div className="bg-base-200 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-base-100 bg-opacity-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                Budgétisation Simple
              </h3>
              <p className="text-base-content text-opacity-70">
                Créez et gérez facilement vos budgets pour chaque catégorie de
                dépenses.
              </p>
            </div>

            <div className="bg-base-200 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-base-100 bg-opacity-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                Analyses Visuelles
              </h3>
              <p className="text-base-content text-opacity-70">
                Visualisez vos habitudes financières avec des graphiques clairs
                et intuitifs.
              </p>
            </div>

            <div className="bg-base-200 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm">
              <div className="bg-base-100 bg-opacity-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-base-content mb-2">
                Sécurité Avancée
              </h3>
              <p className="text-base-content text-opacity-70">
                Vos données financières sont protégées avec les meilleures
                pratiques de sécurité.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-neutral bg-opacity-70 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold text-neutral-content mb-4 md:mb-0">
              E<span className="text-primary">.Finance</span>
            </div>
            <div className="text-neutral-content text-opacity-70 text-sm">
              © {new Date().getFullYear()} E.Finance. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

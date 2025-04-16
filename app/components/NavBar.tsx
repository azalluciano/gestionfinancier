"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 py-3">
        {isLoaded && (
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold tracking-tight text-base-content">
                E<span className="text-primary">.Finance</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isSignedIn && (
              <div className="hidden md:flex items-center space-x-6">
                <Link
                  href="/budgets"
                  className="btn btn-ghost hover:text-primary font-medium transition-colors"
                >
                  Mes budgets
                </Link>
                <Link
                  href="/dashboard"
                  className="btn btn-ghost hover:text-primary font-medium transition-colors"
                >
                  Tableau de bord
                </Link>
                <Link
                  href="/transactions"
                  className="btn btn-ghost hover:text-primary font-medium transition-colors"
                >
                  Mes transactions
                </Link>
              </div>
            )}

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-base-content hover:text-primary font-medium transition-colors"
                  >
                    Se connecter
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 bg-primary text-primary-content rounded-lg font-medium hover:bg-primary-focus transition-colors"
                  >
                    S'inscrire
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden flex items-center text-base-content"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-primary transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 text-primary transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu with Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-base-100 border-t border-base-300 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3 transition-all duration-300">
          {isSignedIn ? (
            <>
              <Link
                href="/budgets"
                className="px-4 py-2 btn btn-ghost hover:text-primary font-medium transition-colors rounded-lg"
                onClick={toggleMenu}
              >
                Mes budgets
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 btn btn-ghost hover:text-primary font-medium transition-colors rounded-lg"
                onClick={toggleMenu}
              >
                Tableau de bord
              </Link>
              <Link
                href="/transactions"
                className="px-4 py-2 btn btn-ghost hover:text-primary font-medium transition-colors rounded-lg"
                onClick={toggleMenu}
              >
                Mes transactions
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-center btn btn-outline border-base-300 text-base-content rounded-lg font-medium"
                onClick={toggleMenu}
              >
                Se connecter
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-center btn btn-primary text-primary-content rounded-lg font-medium"
                onClick={toggleMenu}
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

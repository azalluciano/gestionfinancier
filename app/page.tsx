import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content text-neutral-content text-center">
        <UserButton />
        <div className="flex items-center justify-center flex-col py-10 w-full mt-20">
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold text-center uppercase text-primary">
              Prenez le contrôle <br /> de vos finances avec notre application
            </h1>
            <p className="py-6 text-white text-center">
              Suivez vos budgets et vos dépenses en toute simplicité. <br />
              Notre application vous permet de gérer vos finances personnelles
              de manière efficace et intuitive. <br /> <br />
            </p>
            <div className="flex justify-center items-center">
              <Link
                href={"/sign-in"}
                className="btn btn-primary btn-sm md:btn-md btn-outline "
              >
                Se connecter
              </Link>
              <Link
                href={"/sign-up"}
                className="btn btn-primary btn-sm md:btn-md ml-2 "
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

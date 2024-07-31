import Link from "next/link";
import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-primary p-4 shadow-lg z-50 opacity-80 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-primary-foreground">
          <Link href={"/"}>YKARMR BLOG</Link>
        </h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 container mx-auto mt-20">{children}</main>
    </div>
  );
};

import Link from "next/link";
import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-primary p-4 opacity-80 shadow-lg">
        <h1 className="text-2xl font-extrabold text-primary-foreground">
          <Link href={"/"}>YKARMR BLOG</Link>
        </h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto mt-20 flex-1">{children}</main>
    </div>
  );
};

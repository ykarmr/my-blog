import Link from "next/link";
import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between p-4 opacity-80 shadow-lg backdrop-blur-md">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          <Link href={"/"}>YKARMR BLOG</Link>
        </h1>
        <ThemeToggle />
      </header>
      <main className="container mx-auto mt-24 flex-1 p-4">{children}</main>
    </div>
  );
};

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "../components/navigation";
import Modal from "../components/ui/modal";

const RobotoFont = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={RobotoFont.className + " flex flex-row min-h-screen"}>
        <Navigation />
        <Modal />
        <main className="flex min-h-screen flex-col p-8  w-full">
          {children}
        </main>
      </body>
    </html>
  );
}

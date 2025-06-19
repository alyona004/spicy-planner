import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/adhd-planner/header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "🌶️ Planner",
  description: "A Notion-style planner for ADHD/autistic minds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable}`}>
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Калькулятор стоимости работ",
  description: "Расчёт стоимости подключения",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <nav className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6">
            <Link href="/" className="text-blue-600 font-semibold hover:underline">
              Калькулятор
            </Link>
            <Link href="/water" className="text-blue-600 font-semibold hover:underline">
              Вода
            </Link>
          </div>
        </nav>
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
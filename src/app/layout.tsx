import type { Metadata } from "next";
import { Geist, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Desvendando os Códigos Egípcios",
  description: "Uma jornada pelos mistérios, símbolos e conhecimentos que atravessaram milênios.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${cinzel.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-black text-neutral-100 flex flex-col font-sans selection:bg-[#c9a063] selection:text-black">
        {children}
      </body>
    </html>
  );
}

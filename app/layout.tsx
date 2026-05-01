import { Oswald, Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Tournoi des Quartiers | O Tours de Nous",
  description: "Inscris-toi au grand Tournoi des Quartiers de Givors 2026 ! U8 à U13.",
  openGraph: {
    title: "Tournoi des Quartiers - Givors",
    description: "Inscriptions ouvertes ! Rejoins l'élite sur le City-Stade.",
    // C'est cette ligne qui force l'image lors du partage 👇
    images: ["/flyer2.png"], 
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} ${oswald.variable} bg-pitch-dark text-white`}>
        {children}
      </body>
    </html>
  );
}
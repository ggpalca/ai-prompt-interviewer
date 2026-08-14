import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "AI-интервьюер промтов",
  description: "Пошаговый опрос для кинематографичных промтов",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

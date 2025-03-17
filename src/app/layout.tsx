import type { Metadata } from "next";
import { VT323 } from 'next/font/google';

export const metadata: Metadata = {
  title: "AI Environmental Impact",
  description: "FFAR 298 Term Project by Carson Spriggs-Audet",
};

const handjet = VT323({weight: "400"});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={handjet.className}>
        {children}
      </body>
    </html>
  );
}

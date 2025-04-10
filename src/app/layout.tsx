import type { Metadata } from "next";
import { VT323 } from 'next/font/google';

export const metadata: Metadata = {
  title: "The Impact of AI in the Holocene",
  description: "FFAR 298 Term Project by Carson Spriggs-Audet",
  icons: {
    icon: '/95.png',
  },
};

const handjet = VT323({
  weight: "400",
  subsets: ['latin'],
});

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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexsite",
  description:
    "Nexsite is a leading software development company specializing in web and mobile app development and custom software services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}

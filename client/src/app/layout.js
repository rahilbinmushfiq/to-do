import { Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "To-Do App",
  description:
    "A simple to-do app for learning the basics of backend development of MERN.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} bg-neutral-50 antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

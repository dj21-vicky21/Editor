import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

const ubuntu =  Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CE | Editor",
  description: "Canvas Editor is a tool for creating and editing canvas"
};

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <main className={`w-full h-dvh ${ubuntu.className}`}>
      {children}
   </main>
  );
}

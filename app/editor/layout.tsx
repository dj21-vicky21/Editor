import type { Metadata } from "next";

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
   <main className="w-full h-dvh">
      {children}
   </main>
  );
}

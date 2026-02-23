import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@repo/ui/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./_components/AuthProvider";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Blackmatte Admin",
  description: "Admin Portal for blackmatte.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster theme="dark" position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

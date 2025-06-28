import type { Metadata } from "next";
import { Inter, Outfit,Ovo } from "next/font/google";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top One Plus | Organic Fertilizer",
  description: "Boost crop yields by 100% with seaweed-based fertilizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning className="h-full">
       <body className={`${inter.className} isolate`}> 
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
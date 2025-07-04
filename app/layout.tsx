import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import {
  ClerkProvider
} from '@clerk/nextjs'
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "sonner";

const font = DM_Sans({
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "Automation Builder",
  description: "Automates your work",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

      <html lang="en">
        <body
          className={`${font.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProvider>

              {children}
              <Toaster/>
            </ModalProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

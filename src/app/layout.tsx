import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toast"
import localFont from "next/font/local";
import icon from "../../public/assets/ma7ale_icon.png"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ma7ale",
  description: "",
};

const plusJakartaSansFont = localFont({
  src: "../../fonts/PlusJakartaSans-VariableFont_wght.ttf",
  variable: "--font-plus-jakarta-sans",
})

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSansFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster/>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
